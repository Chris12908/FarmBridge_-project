import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaymentMethod } from '@prisma-client';

export class CreateOrderDto {
  @IsUUID()
  sessionId!: string;

  @IsUUID()
  @IsOptional()
  addressId?: string;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @IsDateString()
  @IsOptional()
  deliveryDate?: string;
}
