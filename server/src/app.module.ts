import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bullmq';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FarmerProfilesModule } from './modules/farmer-profiles/farmer-profiles.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { ProductsModule } from './modules/products/products.module';
import { NegotiationsModule } from './modules/negotiations/negotiations.module';
import { MessagesModule } from './modules/messages/messages.module';
import { PriceProposalsModule } from './modules/price-proposals/price-proposals.module';
import { GatewaysModule } from './gateways/gateways.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EmailModule } from './modules/email/email.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
@Module({
  imports: [
    // Config — global, loaded first
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      { name: 'global', ttl: 60_000, limit: 100 },
      { name: 'auth', ttl: 60_000, limit: 10 },
    ]),

    // BullMQ — global Redis connection
    BullModule.forRoot({
      connection: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      },
    }),

    // Prisma — global
    PrismaModule,

    // Feature modules
    AuthModule,
    UsersModule,
    FarmerProfilesModule,
    AddressesModule,
    UploadsModule,
    ProductsModule,
    NegotiationsModule,
    MessagesModule,
    PriceProposalsModule,
    GatewaysModule,
    OrdersModule,
    PaymentsModule,
    NotificationsModule,
    EmailModule,
    JobsModule,
    ReviewsModule,
    DashboardModule,
  ],
  providers: [
    // Global guards — ALL routes protected by default
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
