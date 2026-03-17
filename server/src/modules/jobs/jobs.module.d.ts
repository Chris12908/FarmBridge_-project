import { OnApplicationBootstrap } from '@nestjs/common';
import { Queue } from 'bullmq';
export declare class JobsModule implements OnApplicationBootstrap {
    private readonly listingCleanupQueue;
    private readonly orderRemindersQueue;
    private readonly proposalExpiryQueue;
    constructor(listingCleanupQueue: Queue, orderRemindersQueue: Queue, proposalExpiryQueue: Queue);
    onApplicationBootstrap(): Promise<void>;
}
