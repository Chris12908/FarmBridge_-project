import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateFarmerProfileDto } from './dto/update-farmer-profile.dto';

@Injectable()
export class FarmerProfilesService {
  constructor(private prisma: PrismaService) {}

  async findPublicProfile(userId: string) {
    const profile = await this.prisma.farmerProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true, createdAt: true },
        },
      },
    });
    if (!profile) throw new NotFoundException('Farmer profile not found');

    const activeListingCount = await this.prisma.product.count({
      where: { farmerId: userId, status: 'ACTIVE' },
    });

    return { ...profile, activeListingCount };
  }

  async getFeatured() {
    return this.prisma.farmerProfile.findMany({
      where: { profileComplete: true, rating: { gt: 0 } },
      orderBy: [{ rating: 'desc' }, { completedOrderCount: 'desc' }],
      take: 8,
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
  }

  async update(userId: string, dto: UpdateFarmerProfileDto) {
    return this.prisma.farmerProfile.update({
      where: { userId },
      data: dto,
    });
  }
}
