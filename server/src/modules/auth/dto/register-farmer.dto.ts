import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class RegisterFarmerDto {
  @ApiProperty({ example: 'John Farmer' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'john@farm.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SecurePass123!', minLength: 8 })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])(?=.*[0-9])/, {
    message:
      'Password must contain at least one uppercase letter and one number',
  })
  password!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: 'Sunrise Harvest Farm', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  farmName?: string;

  @ApiProperty({ example: 'Kigali, Rwanda', required: false })
  @IsOptional()
  @IsString()
  farmLocation?: string;
}
