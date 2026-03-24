import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
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
import { ChatGateway } from '../../gateways/chat.gateway';

@Injectable()
export class PriceProposalsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ChatGateway))
    private chatGateway: ChatGateway,
  ) {}

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

    // Validate transition before writing anything — keeps proposal + session update atomic
    validateTransition(session.status, NegotiationStatus.PRICE_PROPOSED);

    const { proposal, proposalMessage } = await this.prisma.$transaction(async (tx) => {
      const newProposal = await tx.priceProposal.create({
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

      // Create linked PRICE_PROPOSAL message — include priceProposal so the
      // chat bubble can render the proposal card without a follow-up fetch
      const newMessage = await tx.chatMessage.create({
        data: {
          sessionId,
          senderId: proposedByUserId,
          senderRole: proposedBy,
          type: MessageType.PRICE_PROPOSAL,
          priceProposalId: newProposal.id,
          text: `Price proposal: ${dto.proposedPrice} per unit × ${dto.proposedQuantity} units`,
        },
        include: {
          sender: { select: { id: true, name: true, avatarUrl: true } },
          priceProposal: true,
        },
      });

      await tx.negotiationSession.update({
        where: { id: sessionId },
        data: {
          status: NegotiationStatus.PRICE_PROPOSED,
          lastMessageAt: new Date(),
        },
      });

      return { proposal: newProposal, proposalMessage: newMessage };
    });

    // Push to session room so both parties see the proposal card immediately
    this.chatGateway.emitToSession(sessionId, 'chat:message', proposalMessage);
    // Also notify the other participant's personal room for inbox badge update
    const otherUserId =
      proposedBy === Role.BUYER ? session.farmerId : session.buyerId;
    this.chatGateway.emitToUser(otherUserId, 'chat:inbox_update', {
      sessionId,
      message: proposalMessage,
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

      const [, , systemMessage] = await this.prisma.$transaction([
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

      // Both parties see the acceptance system message in real-time
      this.chatGateway.emitToSession(sessionId, 'chat:message', systemMessage);
      // Update the proposal card status in both UIs
      this.chatGateway.emitToSession(sessionId, 'proposal:updated', {
        proposalId,
        status: ProposalStatus.ACCEPTED,
      });
      // Push deal_accepted to buyer's personal room so they redirect to checkout
      this.chatGateway.emitToUser(session.buyerId, 'chat:deal_accepted', {
        sessionId,
        proposalId,
        agreedPrice: proposal.proposedPrice,
        agreedQuantity: proposal.proposedQuantity,
      });
    } else if (dto.action === ProposalAction.COUNTER) {
      if (!dto.counterPrice || !dto.counterQuantity) {
        throw new BadRequestException(
          'counterPrice and counterQuantity are required for a counter offer',
        );
      }
      validateTransition(session.status, NegotiationStatus.PRICE_PROPOSED);

      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // Mark current as COUNTERED, create new proposal, create linked message, update session
      const counterMessage = await this.prisma.$transaction(async (tx) => {
        await tx.priceProposal.update({
          where: { id: proposalId },
          data: { status: ProposalStatus.COUNTERED },
        });

        const counterProposal = await tx.priceProposal.create({
          data: {
            sessionId,
            proposedByUserId: userId,
            proposedBy: userRole,
            proposedPrice: dto.counterPrice!,
            proposedQuantity: dto.counterQuantity!,
            note: dto.counterNote,
            expiresAt,
          },
        });

        const msg = await tx.chatMessage.create({
          data: {
            sessionId,
            senderId: userId,
            senderRole: userRole,
            type: MessageType.PRICE_PROPOSAL,
            priceProposalId: counterProposal.id,
            text: `Counter offer: ${dto.counterPrice} per unit × ${dto.counterQuantity} units`,
          },
          include: {
            sender: { select: { id: true, name: true, avatarUrl: true } },
            priceProposal: true,
          },
        });

        await tx.negotiationSession.update({
          where: { id: sessionId },
          data: {
            status: NegotiationStatus.PRICE_PROPOSED,
            lastMessageAt: new Date(),
          },
        });

        return msg;
      });

      this.chatGateway.emitToSession(sessionId, 'chat:message', counterMessage);
      // Update the original proposal card status in both UIs (PENDING → COUNTERED)
      this.chatGateway.emitToSession(sessionId, 'proposal:updated', {
        proposalId,
        status: ProposalStatus.COUNTERED,
      });
      const otherUserId =
        userRole === Role.BUYER ? session.farmerId : session.buyerId;
      this.chatGateway.emitToUser(otherUserId, 'chat:inbox_update', {
        sessionId,
        message: counterMessage,
      });
    } else {
      validateTransition(session.status, NegotiationStatus.NEGOTIATING);

      const [, , systemMessage] = await this.prisma.$transaction([
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

      // Both parties see the decline system message in real-time
      this.chatGateway.emitToSession(sessionId, 'chat:message', systemMessage);
      // Update the proposal card status in both UIs (PENDING → DECLINED)
      this.chatGateway.emitToSession(sessionId, 'proposal:updated', {
        proposalId,
        status: ProposalStatus.DECLINED,
      });
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
