import { ConfigService } from '@nestjs/config';
export declare class FcmService {
    private readonly configService;
    constructor(configService: ConfigService);
    sendPush(token: string, notification: {
        title: string;
        body: string;
    }, data?: Record<string, string>): Promise<{
        success: boolean;
        messageId: any;
        expired?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        expired: boolean;
        error: string | undefined;
        messageId?: undefined;
    } | {
        success: boolean;
        error: string | undefined;
        messageId?: undefined;
        expired?: undefined;
    }>;
}
