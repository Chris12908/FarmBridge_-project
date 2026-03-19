import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsProcessor } from './notifications.processor';
import { FcmService } from './fcm.service';
import { GatewaysModule } from '../../gateways/gateways.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'notification-queue' }),
    forwardRef(() => GatewaysModule),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsProcessor, FcmService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
