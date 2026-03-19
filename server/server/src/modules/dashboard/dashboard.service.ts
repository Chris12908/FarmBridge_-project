import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  ListingStatus,
  NegotiationStatus,
  OrderStatus,
  PaymentStatus,
} from '@prisma-client';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getFarmerDashboard(farmerId: string) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      activeListingCount,
      pendingNegotiationsCount,
      farmerProfile,
      thisMonthRevenue,
      recentOrders,
    ] = await Promise.all([
      this.prisma.product.count({
        where: { farmerId, status: ListingStatus.ACTIVE },
      }),

      this.prisma.negotiationSession.count({
        where: {
          farmerId,
          status: {
            in: [
              NegotiationStatus.INITIATED,
              NegotiationStatus.NEGOTIATING,
              NegotiationStatus.PRICE_PROPOSED,
            ],
          },
        },
      }),

      this.prisma.farmerProfile.findUnique({
        where: { userId: farmerId },
        select: { completedOrderCount: true, rating: true, reviewCount: true },
      }),

      this.prisma.order.aggregate({
        where: {
          farmerId,
          paymentStatus: PaymentStatus.PAID,
          confirmedAt: { gte: startOfMonth },
        },
        _sum: { totalAmount: true },
      }),

      this.prisma.order.findMany({
        where: { farmerId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          buyer: { select: { id: true, name: true, avatarUrl: true } },
          session: {
            include: { product: { select: { name: true, images: true } } },
          },
        },
      }),
    ]);

    return {
      activeListingCount,
      pendingNegotiationsCount,
      completedOrderCount: farmerProfile?.completedOrderCount ?? 0,
      rating: farmerProfile?.rating ?? 0,
      reviewCount: farmerProfile?.reviewCount ?? 0,
      thisMonthRevenue: Number(thisMonthRevenue._sum.totalAmount ?? 0),
      recentOrders,
    };
  }

  async getBuyerDashboard(buyerId: string) {
    const [
      activeNegotiationsCount,
      pendingOrdersCount,
      totalOrdersCount,
      recentOrders,
    ] = await Promise.all([
      this.prisma.negotiationSession.count({
        where: {
          buyerId,
          status: {
            in: [
              NegotiationStatus.INITIATED,
              NegotiationStatus.NEGOTIATING,
              NegotiationStatus.PRICE_PROPOSED,
              NegotiationStatus.BUYER_APPROVED,
            ],
          },
        },
      }),

      this.prisma.order.count({
        where: {
          buyerId,
          status: {
            in: [
              OrderStatus.PENDING,
              OrderStatus.CONFIRMED,
              OrderStatus.DISPATCHED,
            ],
          },
        },
      }),

      this.prisma.order.count({
        where: { buyerId },
      }),

      this.prisma.order.findMany({
        where: { buyerId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          farmer: { select: { id: true, name: true, avatarUrl: true } },
          session: {
            include: { product: { select: { name: true, images: true } } },
          },
        },
      }),
    ]);

    return {
      activeNegotiationsCount,
      pendingOrdersCount,
      totalOrdersCount,
      recentOrders,
    };
  }
}
