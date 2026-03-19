import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from './stripe.service';
import { OrdersService } from '../orders/orders.service';
export declare class StripeWebhookController {
    private readonly stripeService;
    private readonly ordersService;
    constructor(stripeService: StripeService, ordersService: OrdersService);
    handleStripeWebhook(req: RawBodyRequest<Request>, sig: string): Promise<{
        received: boolean;
    }>;
}
