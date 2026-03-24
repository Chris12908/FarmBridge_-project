import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../email/email.service';
import { ChatGateway } from '../../gateways/chat.gateway';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import {
  NegotiationStatus,
  NotificationType,
  OrderStatus,
  PaymentStatus,
  ProposalStatus,
  Role,
  Prisma,
} from '@prisma-client';
import Redis from 'ioredis';

@Injectable()
export class OrdersService {
  private redis: Redis;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
    @InjectQueue('order-reminders') private readonly orderRemindersQueue: Queue,
    @Inject(forwardRef(() => ChatGateway))
    private readonly chatGateway: ChatGateway,
  ) {
    this.redis = new Redis(
      this.configService.get<string>('redis.url') || 'redis://localhost:6379',
    );
  }

  private async generateOrderNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const key = `order:counter:${year}`;
    const count = await this.redis.incr(key);
    return `#ORD-${year}-${String(count).padStart(3, '0')}`;
  }

  private get frontendUrl(): string {
    return (
      this.configService.get<string>('app.frontendUrl') ||
      process.env.FRONTEND_URL ||
      ''
    );
  }

  async create(buyerId: string, dto: CreateOrderDto) {
    const session = await this.prisma.negotiationSession.findUnique({
      where: { id: dto.sessionId },
      include: {
        product: true,
        buyer: true,
        farmer: true,
      },
    });

    if (!session) throw new NotFoundException('Negotiation session not found');
    if (session.buyerId !== buyerId)
      throw new ForbiddenException('Not authorized');

    const product = session.product;

    // Determine price/quantity from a specific accepted proposal if provided,
    // otherwise fall back to the session-level agreed values.
    let agreedPrice: number;
    let quantity: number;

    if (dto.proposalId) {
      const proposal = await this.prisma.priceProposal.findUnique({
        where: { id: dto.proposalId },
      });
      if (!proposal || proposal.sessionId !== session.id) {
        throw new BadRequestException('Proposal not found in this session');
      }
      if (proposal.status !== ProposalStatus.ACCEPTED) {
        throw new BadRequestException('Proposal must be accepted to checkout');
      }
      agreedPrice = Number(proposal.proposedPrice);
      quantity = proposal.proposedQuantity;
    } else {
      if (!session.agreedPrice || !session.agreedQuantity) {
        throw new BadRequestException(
          'Session is missing agreed price or quantity',
        );
      }
      agreedPrice = Number(session.agreedPrice);
      quantity = session.agreedQuantity;
    }

    if (product.quantityAvailable < quantity) {
      throw new BadRequestException('Insufficient product quantity available');
    }

    let deliveryAddressSnapshot: Prisma.InputJsonValue = {};
    if (dto.addressId) {
      const address = await this.prisma.address.findUnique({
        where: { id: dto.addressId },
      });
      if (!address || address.userId !== buyerId) {
        throw new BadRequestException('Invalid delivery address');
      }
      deliveryAddressSnapshot = {
        label: address.label,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
      };
    }
    const subtotal = agreedPrice * quantity;
    const platformFee = subtotal * 0.05;
    const totalAmount = subtotal + platformFee;

    const orderNumber = await this.generateOrderNumber();

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        sessionId: session.id,
        buyerId,
        farmerId: session.farmerId,
        addressId: dto.addressId,
        deliveryAddressSnapshot,
        quantity,
        pricePerUnit: agreedPrice,
        subtotal,
        platformFee,
        totalAmount,
        status: OrderStatus.PENDING,
        paymentMethod: dto.paymentMethod,
        paymentStatus: PaymentStatus.PENDING,
        ...(dto.deliveryDate && { deliveryDate: new Date(dto.deliveryDate) }),
      },
      include: {
        buyer: { select: { id: true, name: true, email: true } },
        farmer: { select: { id: true, name: true, email: true } },
        session: { include: { product: true } },
      },
    });

    // Update session status to CHECKED_OUT
    await this.prisma.negotiationSession.update({
      where: { id: session.id },
      data: { status: NegotiationStatus.CHECKED_OUT },
    });

    return order;
  }

  async findAll(userId: string, role: Role, query: OrderQueryDto) {
    const { status, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      ...(role === Role.BUYER ? { buyerId: userId } : { farmerId: userId }),
      ...(status && { status }),
    };

    const orders = await this.prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        buyer: { select: { id: true, name: true, avatarUrl: true } },
        farmer: { select: { id: true, name: true, avatarUrl: true } },
        session: {
          include: {
            product: { select: { id: true, name: true, images: true } },
          },
        },
        address: true,
      },
    });
    const total = await this.prisma.order.count({ where });

    return {
      items: orders,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        buyer: {
          select: { id: true, name: true, email: true, avatarUrl: true },
        },
        farmer: {
          select: { id: true, name: true, email: true, avatarUrl: true },
        },
        session: { include: { product: true } },
        address: true,
        review: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== userId && order.farmerId !== userId) {
      throw new ForbiddenException('Not authorized to view this order');
    }

    return order;
  }

  // ─── Payment reference helpers ────────────────────────────────────────────────

  async saveStripePaymentIntent(orderId: string, paymentIntentId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { stripePaymentIntentId: paymentIntentId },
    });
  }

  async saveFlutterwaveTxRef(orderId: string, txRef: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { flutterwaveTxRef: txRef },
    });
  }

  async findByFlutterwaveTxRef(txRef: string) {
    return this.prisma.order.findFirst({
      where: { flutterwaveTxRef: txRef },
    });
  }

  // ─── Payment lifecycle ────────────────────────────────────────────────────────

  async confirmPayment(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        session: { include: { product: true } },
        buyer: { select: { id: true, name: true, email: true } },
        farmer: { select: { id: true, name: true, email: true } },
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    await this.prisma.$transaction([
      this.prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: PaymentStatus.PAID,
          status: OrderStatus.CONFIRMED,
          confirmedAt: new Date(),
        },
      }),
      this.prisma.product.update({
        where: { id: order.session.productId },
        data: { quantityAvailable: { decrement: order.quantity } },
      }),
    ]);

    const productName = order.session.product.name;

    // Best-effort side effects — do not fail the payment confirmation if these throw
    try {
      this.chatGateway.emitToUser(order.buyerId, 'payment:confirmed', { orderId });
      this.chatGateway.emitToUser(order.farmerId, 'payment:confirmed', { orderId });
      this.chatGateway.emitToUser(order.buyerId, 'order:status_changed', { orderId, status: OrderStatus.CONFIRMED });
      this.chatGateway.emitToUser(order.farmerId, 'order:status_changed', { orderId, status: OrderStatus.CONFIRMED });
    } catch { /* non-fatal */ }

    try {
      await this.notificationsService.createAndDispatch(order.buyerId, {
        type: NotificationType.ORDER_CONFIRMED,
        title: 'Order Confirmed!',
        body: `Your order for ${productName} has been confirmed. Payment received.`,
        data: { orderId },
      });
      await this.notificationsService.createAndDispatch(order.farmerId, {
        type: NotificationType.PAYMENT_RECEIVED,
        title: 'Payment Received',
        body: `Payment confirmed for order ${order.orderNumber}. Please prepare for dispatch.`,
        data: { orderId },
      });
      await this.emailService.queueEmail('order-confirmed-buyer', {
        to: order.buyer.email,
        context: {
          name: order.buyer.name,
          orderNumber: order.orderNumber,
          productName,
          quantity: order.quantity,
          totalAmount: `$${Number(order.totalAmount).toFixed(2)}`,
          ctaUrl: `${this.frontendUrl}/buyer/orders/${orderId}`,
        },
      });
      await this.emailService.queueEmail('order-confirmed-farmer', {
        to: order.farmer.email,
        context: {
          name: order.farmer.name,
          orderNumber: order.orderNumber,
          productName,
          quantity: order.quantity,
          buyerName: order.buyer.name,
          totalAmount: `$${Number(order.totalAmount).toFixed(2)}`,
          ctaUrl: `${this.frontendUrl}/farmer/orders/${orderId}`,
        },
      });
    } catch { /* non-fatal */ }

    return this.prisma.order.findUnique({ where: { id: orderId } });
  }

  async failPayment(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException('Order not found');

    return this.prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: PaymentStatus.FAILED },
    });
  }

  // ─── Order status lifecycle ───────────────────────────────────────────────────

  async updateStatus(id: string, farmerId: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        buyer: { select: { id: true, name: true, email: true } },
        farmer: { select: { id: true, name: true, email: true } },
        session: { include: { product: { select: { name: true } } } },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.farmerId !== farmerId) {
      throw new ForbiddenException('Not authorized to update this order');
    }

    const validTransitions: Record<string, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED],
      [OrderStatus.CONFIRMED]: [OrderStatus.DISPATCHED],
      [OrderStatus.DISPATCHED]: [OrderStatus.DELIVERED],
    };

    const allowedNext = validTransitions[order.status];
    if (!allowedNext || !allowedNext.includes(dto.status)) {
      throw new BadRequestException(
        `Cannot transition order from ${order.status} to ${dto.status}`,
      );
    }

    const updateData: Prisma.OrderUncheckedUpdateInput = { status: dto.status };
    const productName = order.session.product.name;

    if (dto.status === OrderStatus.CONFIRMED) {
      updateData.confirmedAt = new Date();
    }

    if (dto.status === OrderStatus.DISPATCHED) {
      updateData.dispatchedAt = new Date();
    }

    if (dto.status === OrderStatus.DELIVERED) {
      updateData.deliveredAt = new Date();
    }

    const updated = await this.prisma.order.update({
      where: { id },
      data: updateData,
    });

    // Best-effort side effects — do not fail the status update if these throw
    try {
      this.chatGateway.emitToUser(order.buyerId, 'order:status_changed', { orderId: id, status: dto.status });
      this.chatGateway.emitToUser(order.farmerId, 'order:status_changed', { orderId: id, status: dto.status });
    } catch { /* non-fatal */ }

    try {
      if (dto.status === OrderStatus.DISPATCHED) {
        await this.notificationsService.createAndDispatch(order.buyerId, {
          type: NotificationType.ORDER_DISPATCHED,
          title: 'Order Dispatched!',
          body: `Your order for ${productName} is on its way!`,
          data: { orderId: id },
        });
        await this.emailService.queueEmail('order-dispatched', {
          to: order.buyer.email,
          context: {
            name: order.buyer.name,
            orderNumber: order.orderNumber,
            productName,
            quantity: order.quantity,
            ctaUrl: `${this.frontendUrl}/buyer/orders/${id}`,
          },
        });
      }

      if (dto.status === OrderStatus.DELIVERED) {
        await this.prisma.farmerProfile.update({
          where: { userId: farmerId },
          data: { completedOrderCount: { increment: 1 } },
        });
        await this.prisma.negotiationSession.update({
          where: { id: order.sessionId },
          data: { status: NegotiationStatus.FULFILLED },
        });
        await this.notificationsService.createAndDispatch(order.buyerId, {
          type: NotificationType.ORDER_DELIVERED,
          title: 'Order Delivered!',
          body: `Your order for ${productName} has been delivered. Leave a review!`,
          data: { orderId: id },
        });
        await this.emailService.queueEmail('review-request', {
          to: order.buyer.email,
          context: {
            name: order.buyer.name,
            productName,
            farmerName: order.farmer.name,
            ctaUrl: `${this.frontendUrl}/buyer/orders/${id}`,
          },
        });
      }
    } catch { /* non-fatal */ }

    return updated;
  }

  async confirmDelivery(id: string, buyerId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        buyer: { select: { id: true, name: true, email: true } },
        farmer: { select: { id: true, name: true, email: true } },
        session: { include: { product: { select: { name: true } } } },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== buyerId) throw new ForbiddenException('Not authorized');
    if (order.status !== OrderStatus.DISPATCHED) {
      throw new BadRequestException('Order must be dispatched before confirming delivery');
    }

    const productName = order.session.product.name;

    await this.prisma.$transaction(async (tx) => {
      await tx.farmerProfile.update({
        where: { userId: order.farmerId },
        data: { completedOrderCount: { increment: 1 } },
      });
      await tx.negotiationSession.update({
        where: { id: order.sessionId },
        data: { status: NegotiationStatus.FULFILLED },
      });
      await tx.order.update({
        where: { id },
        data: { status: OrderStatus.DELIVERED, deliveredAt: new Date() },
      });
    });

    // Best-effort side effects
    try {
      this.chatGateway.emitToUser(order.buyerId, 'order:status_changed', { orderId: id, status: OrderStatus.DELIVERED });
      this.chatGateway.emitToUser(order.farmerId, 'order:status_changed', { orderId: id, status: OrderStatus.DELIVERED });
    } catch { /* non-fatal */ }

    try {
      await this.notificationsService.createAndDispatch(order.farmerId, {
        type: NotificationType.ORDER_DELIVERED,
        title: 'Delivery Confirmed!',
        body: `${order.buyer.name} confirmed receipt of their order for ${productName}.`,
        data: { orderId: id },
      });
      await this.emailService.queueEmail('review-request', {
        to: order.buyer.email,
        context: {
          name: order.buyer.name,
          productName,
          farmerName: order.farmer.name,
          ctaUrl: `${this.frontendUrl}/buyer/orders/${id}`,
        },
      });
    } catch { /* non-fatal */ }

    return this.prisma.order.findUnique({ where: { id } });
  }

  async cancel(id: string, userId: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== userId)
      throw new ForbiddenException('Not authorized');
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only PENDING orders can be cancelled');
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELLED, cancelledAt: new Date() },
    });
  }
}
