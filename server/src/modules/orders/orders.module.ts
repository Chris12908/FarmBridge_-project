import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { EmailModule } from '../email/email.module';
import { GatewaysModule } from '../../gateways/gateways.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'order-reminders' }),
    NotificationsModule,
    EmailModule,
    forwardRef(() => GatewaysModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
