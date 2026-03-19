import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { OrderStatus } from '@prisma-client';

@Processor('order-reminders')
export class OrderRemindersProcessor extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async process(_job: Job<any>) {
    // Find orders stuck in CONFIRMED for more than 48 hours
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - 48);

    const stuckOrders = await this.prisma.order.findMany({
      where: {
        status: OrderStatus.CONFIRMED,
        confirmedAt: { lt: cutoff },
      },
      include: {
        farmer: { select: { id: true, name: true, email: true } },
        session: { include: { product: { select: { name: true } } } },
      },
    });

    if (stuckOrders.length === 0) return;

    for (const order of stuckOrders) {
      await this.emailService.queueEmail('order-confirmed-farmer', {
        to: order.farmer.email,
        subject: 'Reminder: Order Awaiting Dispatch',
        context: {
          name: order.farmer.name,
          orderNumber: order.orderNumber,
          productName: order.session.product.name,
          quantity: order.quantity,
          buyerName: 'Your buyer',
          totalAmount: `$${Number(order.totalAmount).toFixed(2)}`,
          ctaUrl: `${process.env.FRONTEND_URL}/farmer/orders/${order.id}`,
        },
      });
    }

    console.log(
      `Order reminders: sent reminders for ${stuckOrders.length} stuck orders`,
    );
  }
}
