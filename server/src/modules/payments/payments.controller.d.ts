import { StripeService } from './stripe.service';
import { FlutterwaveService } from './flutterwave.service';
import { OrdersService } from '../orders/orders.service';
import { JwtPayload } from '../../common/types/jwt-payload.type';
export declare class PaymentsController {
    private readonly stripeService;
    private readonly flutterwaveService;
    private readonly ordersService;
    constructor(stripeService: StripeService, flutterwaveService: FlutterwaveService, ordersService: OrdersService);
    initiateStripe(user: JwtPayload, body: {
        orderId: string;
    }): Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
        orderId: string;
    }>;
    initiateFlutterwave(user: JwtPayload, body: {
        orderId: string;
        phoneNumber: string;
    }): Promise<{
        result: import("./flutterwave.service").FlutterwaveResponse;
        txRef: string;
        orderId: string;
    }>;
}
