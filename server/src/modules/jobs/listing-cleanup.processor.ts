import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { ListingStatus } from '@prisma-client';

@Processor('listing-cleanup')
export class ListingCleanupProcessor extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async process(_job: Job<any>) {
    const now = new Date();

    // Find all ACTIVE products that have expired
    const expiredProducts = await this.prisma.product.findMany({
      where: {
        status: ListingStatus.ACTIVE,
        expiresAt: { lt: now },
      },
      include: {
        farmer: { select: { id: true, name: true, email: true } },
      },
    });

    if (expiredProducts.length === 0) return;

    // Update them to EXPIRED
    await this.prisma.product.updateMany({
      where: {
        id: { in: expiredProducts.map((p) => p.id) },
      },
      data: { status: ListingStatus.EXPIRED },
    });

    // Queue listing-expiring emails for each farmer
    for (const product of expiredProducts) {
      await this.emailService.queueEmail('listing-expiring', {
        to: product.farmer.email,
        context: {
          name: product.farmer.name,
          productName: product.name,
          expiresAt: product.expiresAt?.toLocaleDateString() ?? 'N/A',
          ctaUrl: `${process.env.FRONTEND_URL}/farmer/listings/${product.id}/edit`,
        },
      });
    }

    console.log(`Listing cleanup: expired ${expiredProducts.length} products`);
  }
}
