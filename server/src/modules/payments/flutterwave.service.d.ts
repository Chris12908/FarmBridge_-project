import { ConfigService } from '@nestjs/config';
export interface FlutterwaveResponse {
    data?: Record<string, unknown>;
    status?: string;
}
export declare class FlutterwaveService {
    private readonly configService;
    private flw;
    constructor(configService: ConfigService);
    initiateMobileMoney(phone: string, amount: number, currency: string, txRef: string, provider: string, customerEmail: string): Promise<FlutterwaveResponse>;
    verifyWebhookHash(hash: string): boolean;
    verifyTransaction(txId: string): Promise<FlutterwaveResponse>;
}
