import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
export declare class EmailService {
    private readonly emailQueue;
    private readonly configService;
    private transporter;
    constructor(emailQueue: Queue, configService: ConfigService);
    queueEmail(jobName: string, data: any, delay?: number): Promise<void>;
    sendEmail(to: string, subject: string, templateName: string, context: Record<string, unknown>): Promise<void>;
}
