import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';
import { ProposalStatus } from '@prisma-client';

@Processor('proposal-expiry')
export class ProposalExpiryProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async process(_job: Job<any>) {
    const now = new Date();

    const result = await this.prisma.priceProposal.updateMany({
      where: {
        status: ProposalStatus.PENDING,
        expiresAt: { lt: now },
      },
      data: { status: ProposalStatus.EXPIRED },
    });

    if (result.count > 0) {
      console.log(`Proposal expiry: expired ${result.count} pending proposals`);
    }
  }
}
