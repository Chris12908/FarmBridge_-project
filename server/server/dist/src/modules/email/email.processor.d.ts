import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from './email.service';
interface EmailJobData {
    to: string;
    subject?: string;
    context: Record<string, unknown>;
}
export declare class EmailProcessor extends WorkerHost {
    private readonly emailService;
    constructor(emailService: EmailService);
    process(job: Job<EmailJobData>): Promise<void>;
}
export {};
