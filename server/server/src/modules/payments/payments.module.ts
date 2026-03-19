import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { FlutterwaveService } from './flutterwave.service';
import { PaymentsController } from './payments.controller';
import { StripeWebhookController } from './stripe.webhook.controller';
import { FlutterwaveWebhookController } from './flutterwave.webhook.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [
    PaymentsController,
    StripeWebhookController,
    FlutterwaveWebhookController,
  ],
  providers: [StripeService, FlutterwaveService],
  exports: [StripeService, FlutterwaveService],
})
export class PaymentsModule {}
