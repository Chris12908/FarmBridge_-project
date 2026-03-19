import {
  Controller,
  Post,
  Req,
  Headers,
  BadRequestException,
  RawBodyRequest,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { StripeService } from './stripe.service';
import { OrdersService } from '../orders/orders.service';
import Stripe from 'stripe';

@Controller('webhooks')
export class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post('stripe')
  @Public()
  async handleStripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') sig: string,
  ) {
    const rawBody = req.rawBody;
    if (!rawBody) throw new BadRequestException('No raw body');

    let event: Stripe.Event;
    try {
      event = this.stripeService.constructWebhookEvent(rawBody, sig);
    } catch {
      throw new BadRequestException('Webhook signature verification failed');
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata?.orderId;
        if (orderId) {
          await this.ordersService.confirmPayment(orderId);
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata?.orderId;
        if (orderId) {
          await this.ordersService.failPayment(orderId);
        }
        break;
      }
    }

    return { received: true };
  }
}
