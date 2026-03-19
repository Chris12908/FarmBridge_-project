import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { StripeService } from './stripe.service';
import { FlutterwaveService } from './flutterwave.service';
import { OrdersService } from '../orders/orders.service';
import { Role } from '@prisma-client';
import { JwtPayload } from '../../common/types/jwt-payload.type';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly flutterwaveService: FlutterwaveService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post('stripe/initiate')
  @Roles(Role.BUYER)
  async initiateStripe(
    @CurrentUser() user: JwtPayload,
    @Body() body: { orderId: string },
  ) {
    const order = await this.ordersService.findOne(body.orderId, user.sub);
    const { clientSecret, paymentIntentId } =
      await this.stripeService.createPaymentIntent(
        order.id,
        Number(order.totalAmount),
        'usd',
        { buyerId: user.sub, orderNumber: order.orderNumber },
      );

    // Persist paymentIntentId so the Stripe webhook can look up the order
    await this.ordersService.saveStripePaymentIntent(order.id, paymentIntentId);

    return { clientSecret, paymentIntentId, orderId: order.id };
  }

  @Post('flutterwave/initiate')
  @Roles(Role.BUYER)
  async initiateFlutterwave(
    @CurrentUser() user: JwtPayload,
    @Body() body: { orderId: string; phoneNumber: string },
  ) {
    const order = await this.ordersService.findOne(body.orderId, user.sub);
    const txRef = `FW-${order.orderNumber}-${Date.now()}`;

    const result = await this.flutterwaveService.initiateMobileMoney(
      body.phoneNumber,
      Number(order.totalAmount),
      'KES',
      txRef,
      'mpesa',
      user.email,
    );

    // Persist txRef so the Flutterwave webhook can look up the order
    await this.ordersService.saveFlutterwaveTxRef(order.id, txRef);

    return { result, txRef, orderId: order.id };
  }
}
