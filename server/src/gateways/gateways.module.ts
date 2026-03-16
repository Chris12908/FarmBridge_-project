import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { NegotiationsModule } from '../modules/negotiations/negotiations.module';
import { MessagesModule } from '../modules/messages/messages.module';
import { NotificationsModule } from '../modules/notifications/notifications.module';

@Module({
  imports: [
    JwtModule.register({}),
    NegotiationsModule,
    MessagesModule,
    forwardRef(() => NotificationsModule),
  ],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class GatewaysModule {}
