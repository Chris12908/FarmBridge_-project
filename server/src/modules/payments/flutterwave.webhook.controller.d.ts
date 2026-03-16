import { Request } from 'express';
import { FlutterwaveService } from './flutterwave.service';
import { OrdersService } from '../orders/orders.service';
export declare class FlutterwaveWebhookController {
    private readonly flutterwaveService;
    private readonly ordersService;
    constructor(flutterwaveService: FlutterwaveService, ordersService: OrdersService);
    handleFlutterwaveWebhook(req: Request, verifHash: string): Promise<{
        received: boolean;
    }>;
}
