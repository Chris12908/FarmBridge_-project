import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ProposalExpiryProcessor extends WorkerHost {
    private readonly prisma;
    constructor(prisma: PrismaService);
    process(_job: Job<any>): Promise<void>;
}
