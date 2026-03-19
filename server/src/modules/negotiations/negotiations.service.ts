import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNegotiationDto } from './dto/create-negotiation.dto';
import { UpdateNegotiationStatusDto } from './dto/update-negotiation-status.dto';
import { validateTransition } from './negotiations.state-machine';
import { Role, NegotiationStatus, Prisma } from '@prisma-client';

@Injectable()
export class NegotiationsService {
  constructor(private prisma: PrismaService) {}

  async create(buyerId: string, dto: CreateNegotiationDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    // Upsert — prevent duplicate sessions per buyer+farmer+product
    const existing = await this.prisma.negotiationSession.findFirst({
      where: { buyerId, farmerId: product.farmerId, productId: dto.productId },
    });
    if (existing) return existing;

    return this.prisma.negotiationSession.create({
      data: {
        buyerId,
        farmerId: product.farmerId,
        productId: dto.productId,
        status: NegotiationStatus.INITIATED,
      },
      include: { product: true },
    });
  }

  async findAllForUser(userId: string, role: Role, status?: NegotiationStatus) {
    const where: Prisma.NegotiationSessionWhereInput = {
      ...(role === Role.BUYER ? { buyerId: userId } : { farmerId: userId }),
      ...(status && { status }),
    };

    return this.prisma.negotiationSession.findMany({
      where,
      orderBy: [{ lastMessageAt: 'desc' }, { createdAt: 'desc' }],
      include: {
        product: {
          select: {
            id: true,
            name: true,
            images: true,
            pricePerUnit: true,
            unit: true,
          },
        },
        buyer: { select: { id: true, name: true, avatarUrl: true } },
        farmer: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const session = await this.prisma.negotiationSession.findUnique({
      where: { id },
      include: {
        product: true,
        buyer: { select: { id: true, name: true, avatarUrl: true } },
        farmer: { select: { id: true, name: true, avatarUrl: true } },
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 30,
          include: { priceProposal: true },
        },
        proposals: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    });

    if (!session) throw new NotFoundException('Negotiation session not found');
    this.assertParticipant(session, userId);

    return session;
  }

  async updateStatus(
    id: string,
    userId: string,
    dto: UpdateNegotiationStatusDto,
  ) {
    const session = await this.prisma.negotiationSession.findUnique({
      where: { id },
    });
    if (!session) throw new NotFoundException('Session not found');
    this.assertParticipant(session, userId);
    validateTransition(session.status, dto.status);

    return this.prisma.negotiationSession.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  async verifyParticipant(sessionId: string, userId: string): Promise<void> {
    const session = await this.prisma.negotiationSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Session not found');
    this.assertParticipant(session, userId);
  }

  private assertParticipant(
    session: { buyerId: string; farmerId: string },
    userId: string,
  ) {
    if (session.buyerId !== userId && session.farmerId !== userId) {
      throw new ForbiddenException('You are not a participant in this session');
    }
  }
}
