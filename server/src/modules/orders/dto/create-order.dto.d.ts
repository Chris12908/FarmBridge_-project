import { PaymentMethod } from '@prisma-client';
export declare class CreateOrderDto {
    sessionId: string;
    addressId?: string;
    paymentMethod: PaymentMethod;
    deliveryDate?: string;
}
