import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePriceProposalDto } from './dto/create-price-proposal.dto';
import { ProposalAction, RespondProposalDto } from './dto/respond-proposal.dto';
import { validateTransition } from '../negotiations/negotiations.state-machine';
import {
  Role,
  NegotiationStatus,
  ProposalStatus,
  MessageType,
} from '@prisma-client';

@Injectable()
export class PriceProposalsService {
  constructor(private prisma: PrismaService) {}

  async create(
    sessionId: string,
    proposedByUserId: string,
    proposedBy: Role,
    dto: CreatePriceProposalDto,
  ) {
    const session = await this.prisma.negotiationSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Session not found');
    if (
      session.buyerId !== proposedByUserId &&
      session.farmerId !== proposedByUserId
    ) {
      throw new ForbiddenException('Not a participant');
    }

    // Only one PENDING proposal at a time
    const pending = await this.prisma.priceProposal.findFirst({
      where: { sessionId, status: ProposalStatus.PENDING },
    });
    if (pending)
      throw new ConflictException('A pending proposal already exists');

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    const proposal = await this.prisma.priceProposal.create({
      data: {
        sessionId,
        proposedByUserId,
        proposedBy,
        proposedPrice: dto.proposedPrice,
        proposedQuantity: dto.proposedQuantity,
        note: dto.note,
        expiresAt,
      },
    });

    // Create linked PRICE_PROPOSAL message
    await this.prisma.chatMessage.create({
      data: {
        sessionId,
        senderId: proposedByUserId,
        senderRole: proposedBy,
        type: MessageType.PRICE_PROPOSAL,
        priceProposalId: proposal.id,
        text: `Price proposal: ${dto.proposedPrice} per unit × ${dto.proposedQuantity} units`,
      },
    });

    // Update session status
    validateTransition(session.status, NegotiationStatus.PRICE_PROPOSED);
    await this.prisma.negotiationSession.update({
      where: { id: sessionId },
      data: {
        status: NegotiationStatus.PRICE_PROPOSED,
        lastMessageAt: new Date(),
      },
    });

    return proposal;
  }

  async respond(
    sessionId: string,
    proposalId: string,
    userId: string,
    userRole: Role,
    dto: RespondProposalDto,
  ) {
    const proposal = await this.prisma.priceProposal.findUnique({
      where: { id: proposalId },
    });
    if (!proposal || proposal.sessionId !== sessionId) {
      throw new NotFoundException('Proposal not found');
    }
    if (proposal.status !== ProposalStatus.PENDING) {
      throw new BadRequestException('Proposal is no longer pending');
    }
    if (proposal.proposedByUserId === userId) {
      throw new ForbiddenException('Cannot respond to your own proposal');
    }

    const session = await this.prisma.negotiationSession.findUniqueOrThrow({
      where: { id: sessionId },
    });

    if (dto.action === ProposalAction.ACCEPT) {
      validateTransition(session.status, NegotiationStatus.BUYER_APPROVED);

      await this.prisma.$transaction([
        this.prisma.priceProposal.update({
          where: { id: proposalId },
          data: { status: ProposalStatus.ACCEPTED },
        }),
        this.prisma.negotiationSession.update({
          where: { id: sessionId },
          data: {
            status: NegotiationStatus.BUYER_APPROVED,
            agreedPrice: proposal.proposedPrice,
            agreedQuantity: proposal.proposedQuantity,
          },
        }),
        this.prisma.chatMessage.create({
          data: {
            sessionId,
            senderId: userId,
            senderRole: userRole,
            type: MessageType.SYSTEM,
            text: `✅ Offer accepted — ${proposal.proposedPrice.toString()} per unit × ${proposal.proposedQuantity} units`,
          },
        }),
      ]);
    } else {
      validateTransition(session.status, NegotiationStatus.NEGOTIATING);

      await this.prisma.$transaction([
        this.prisma.priceProposal.update({
          where: { id: proposalId },
          data: { status: ProposalStatus.DECLINED },
        }),
        this.prisma.negotiationSession.update({
          where: { id: sessionId },
          data: { status: NegotiationStatus.NEGOTIATING },
        }),
        this.prisma.chatMessage.create({
          data: {
            sessionId,
            senderId: userId,
            senderRole: userRole,
            type: MessageType.SYSTEM,
            text: '❌ Offer declined — continue negotiating',
          },
        }),
      ]);
    }

    return { message: `Proposal ${dto.action}ed` };
  }

  async findBySession(sessionId: string) {
    return this.prisma.priceProposal.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
