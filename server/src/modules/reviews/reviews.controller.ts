import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '@prisma-client';
import { JwtPayload } from '../../common/types/jwt-payload.type';

@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles(Role.BUYER)
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(user.sub, dto);
  }

  @Get('farmer/:farmerId')
  findByFarmer(
    @Param('farmerId') farmerId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.reviewsService.findByFarmer(farmerId, +page, +limit);
  }

  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.reviewsService.findByOrder(orderId);
  }
}
