import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { OrderStatus } from '@prisma-client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(reviewerId: string, dto: CreateReviewDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: { session: true },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== reviewerId) {
      throw new ForbiddenException('Only the buyer can review this order');
    }
    if (order.status !== OrderStatus.DELIVERED) {
      throw new BadRequestException('Can only review delivered orders');
    }

    // Check for existing review (unique constraint will also catch this)
    const existing = await this.prisma.review.findUnique({
      where: { orderId: dto.orderId },
    });
    if (existing) {
      throw new BadRequestException('You have already reviewed this order');
    }

    const farmerId = order.farmerId;

    const review = await this.prisma.review.create({
      data: {
        orderId: dto.orderId,
        reviewerId,
        farmerId,
        rating: dto.rating,
        comment: dto.comment,
      },
    });

    // Update farmer profile rating and reviewCount
    const allReviews = await this.prisma.review.findMany({
      where: { farmerId },
      select: { rating: true },
    });

    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await this.prisma.farmerProfile.update({
      where: { userId: farmerId },
      data: {
        rating: avgRating,
        reviewCount: allReviews.length,
      },
    });

    return review;
  }

  async findByFarmer(farmerId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const reviews = await this.prisma.review.findMany({
      where: { farmerId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        reviewer: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
    const total = await this.prisma.review.count({ where: { farmerId } });

    return {
      data: reviews,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findByOrder(orderId: string) {
    return this.prisma.review.findUnique({
      where: { orderId },
      include: {
        reviewer: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
  }
}
