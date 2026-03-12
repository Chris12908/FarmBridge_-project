import { OrderStatus } from '@prisma-client';
export declare class OrderQueryDto {
    status?: OrderStatus;
    page?: number;
    limit?: number;
}
