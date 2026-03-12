import { Module } from '@nestjs/common';
import { FarmerProfilesController } from './farmer-profiles.controller';
import { FarmerProfilesService } from './farmer-profiles.service';

@Module({
  controllers: [FarmerProfilesController],
  providers: [FarmerProfilesService],
  exports: [FarmerProfilesService],
})
export class FarmerProfilesModule {}
