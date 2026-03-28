import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';
import { Role, MessageType, NegotiationStatus } from '@prisma-client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(
    sessionId: string,
    senderId: string,
    senderRole: Role,
    dto: SendMessageDto,
  ) {
    const session = await this.prisma.negotiationSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Session not found');
    if (session.buyerId !== senderId && session.farmerId !== senderId) {
      throw new ForbiddenException('Not a participant');
    }

    const message = await this.prisma.chatMessage.create({
      data: {
        sessionId,
        senderId,
        senderRole,
        type: dto.type,
        text: dto.text,
        voiceNoteUrl: dto.voiceNoteUrl,
        voiceNoteDurationSecs: dto.voiceNoteDurationSecs,
        imageUrl: dto.imageUrl,
      },
      include: {
        sender: { select: { id: true, name: true, avatarUrl: true } },
      },
    });

    // Update session preview + unread counter, and auto-advance INITIATED → NEGOTIATING
    const preview = this.buildPreview(dto);
    const autoAdvanceStatuses: NegotiationStatus[] = [
      NegotiationStatus.INITIATED,
      NegotiationStatus.BUYER_APPROVED,
      NegotiationStatus.CHECKED_OUT,
    ];
    const isToFarmer = senderRole === Role.BUYER;
    const updatedSession = await this.prisma.negotiationSession.update({
      where: { id: sessionId },
      data: {
        lastMessageAt: message.createdAt,
        lastMessagePreview: preview,
        ...(isToFarmer
          ? { farmerUnreadCount: { increment: 1 } }
          : { buyerUnreadCount: { increment: 1 } }),
        ...(autoAdvanceStatuses.includes(session.status) && {
          status: NegotiationStatus.NEGOTIATING,
        }),
      },
    });

    return { message, session: updatedSession };
  }

  async markRead(sessionId: string, userId: string, role: Role) {
    // Mark all messages NOT sent by this user as read
    await this.prisma.chatMessage.updateMany({
      where: { sessionId, senderId: { not: userId }, readByRecipient: false },
      data: { readByRecipient: true },
    });

    // Reset unread counter for this user
    await this.prisma.negotiationSession.update({
      where: { id: sessionId },
      data:
        role === Role.BUYER
          ? { buyerUnreadCount: 0 }
          : { farmerUnreadCount: 0 },
    });
  }

  async findBySession(sessionId: string, cursor?: string, limit = 20) {
    const messages = await this.prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      include: {
        sender: { select: { id: true, name: true, avatarUrl: true } },
        priceProposal: true,
      },
    });

    const hasMore = messages.length > limit;
    const items = hasMore ? messages.slice(0, limit) : messages;
    const nextCursor = hasMore ? items[items.length - 1].id : undefined;

    return { items, nextCursor, hasMore };
  }

  private buildPreview(dto: SendMessageDto): string {
    switch (dto.type) {
      case MessageType.VOICE_NOTE:
        return '🎵 Voice note';
      case MessageType.IMAGE:
        return '📷 Image';
      case MessageType.PRICE_PROPOSAL:
        return '💰 Price proposal';
      case MessageType.SYSTEM:
        return dto.text ?? 'System message';
      default:
        return dto.text?.substring(0, 100) ?? '';
    }
  }
}
