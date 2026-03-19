import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
export declare class StripeService {
    private readonly configService;
    private stripe;
    constructor(configService: ConfigService);
    createPaymentIntent(orderId: string, amount: number, currency?: string, metadata?: Record<string, string>): Promise<{
        clientSecret: any;
        paymentIntentId: any;
    }>;
    constructWebhookEvent(rawBody: Buffer, sig: string): Stripe.Event;
    createRefund(paymentIntentId: string): Promise<any>;
}
