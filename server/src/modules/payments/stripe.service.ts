import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    const secretKey = this.configService.getOrThrow<string>('stripe.secretKey');
    this.stripe = new Stripe(secretKey);
  }

  async createPaymentIntent(
    orderId: string,
    amount: number,
    currency = 'usd',
    metadata: Record<string, string> = {},
  ) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency,
      metadata: { orderId, ...metadata },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }

  constructWebhookEvent(rawBody: Buffer, sig: string): Stripe.Event {
    const webhookSecret = this.configService.getOrThrow<string>(
      'stripe.webhookSecret',
    );
    return this.stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  }

  async createRefund(paymentIntentId: string) {
    return this.stripe.refunds.create({ payment_intent: paymentIntentId });
  }
}
