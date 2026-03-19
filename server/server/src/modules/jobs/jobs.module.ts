import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ListingCleanupProcessor } from './listing-cleanup.processor';
import { OrderRemindersProcessor } from './order-reminders.processor';
import { ProposalExpiryProcessor } from './proposal-expiry.processor';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: 'listing-cleanup' },
      { name: 'order-reminders' },
      { name: 'proposal-expiry' },
    ),
    EmailModule,
  ],
  providers: [
    ListingCleanupProcessor,
    OrderRemindersProcessor,
    ProposalExpiryProcessor,
  ],
})
export class JobsModule implements OnApplicationBootstrap {
  constructor(
    @InjectQueue('listing-cleanup') private readonly listingCleanupQueue: Queue,
    @InjectQueue('order-reminders') private readonly orderRemindersQueue: Queue,
    @InjectQueue('proposal-expiry') private readonly proposalExpiryQueue: Queue,
  ) {}

  async onApplicationBootstrap() {
    // Remove existing repeatable jobs to avoid duplicates on restart
    const cleanupJobs = await this.listingCleanupQueue.getRepeatableJobs();
    for (const job of cleanupJobs) {
      await this.listingCleanupQueue.removeRepeatableByKey(job.key);
    }

    const reminderJobs = await this.orderRemindersQueue.getRepeatableJobs();
    for (const job of reminderJobs) {
      await this.orderRemindersQueue.removeRepeatableByKey(job.key);
    }

    const expiryJobs = await this.proposalExpiryQueue.getRepeatableJobs();
    for (const job of expiryJobs) {
      await this.proposalExpiryQueue.removeRepeatableByKey(job.key);
    }

    // Register cron repeatable jobs
    await this.listingCleanupQueue.add(
      'run-cleanup',
      {},
      { repeat: { pattern: '0 0 * * *' } }, // midnight daily
    );

    await this.orderRemindersQueue.add(
      'send-reminders',
      {},
      { repeat: { pattern: '0 8 * * *' } }, // 8am daily
    );

    await this.proposalExpiryQueue.add(
      'expire-proposals',
      {},
      { repeat: { pattern: '0 * * * *' } }, // every hour
    );

    console.log(
      'Background jobs registered: listing-cleanup (midnight), order-reminders (8am), proposal-expiry (hourly)',
    );
  }
}
