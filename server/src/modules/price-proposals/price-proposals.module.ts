import { forwardRef, Module } from '@nestjs/common';
import { PriceProposalsController } from './price-proposals.controller';
import { PriceProposalsService } from './price-proposals.service';
import { GatewaysModule } from '../../gateways/gateways.module';

@Module({
  imports: [forwardRef(() => GatewaysModule)],
  controllers: [PriceProposalsController],
  providers: [PriceProposalsService],
  exports: [PriceProposalsService],
})
export class PriceProposalsModule {}
