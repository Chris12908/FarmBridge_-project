import { Module } from '@nestjs/common';
import { PriceProposalsController } from './price-proposals.controller';
import { PriceProposalsService } from './price-proposals.service';

@Module({
  controllers: [PriceProposalsController],
  providers: [PriceProposalsService],
  exports: [PriceProposalsService],
})
export class PriceProposalsModule {}
