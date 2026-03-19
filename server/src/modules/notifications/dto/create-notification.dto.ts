import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { NotificationType } from '@prisma-client';

export class CreateNotificationDto {
  @IsEnum(NotificationType)
  type!: NotificationType;

  @IsString()
  title!: string;

  @IsString()
  body!: string;

  @IsObject()
  @IsOptional()
  data?: Record<string, any>;
}
