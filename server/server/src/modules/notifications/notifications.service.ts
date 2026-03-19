import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma-client';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ChatGateway } from '../../gateways/chat.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('notification-queue')
    private readonly notificationQueue: Queue,
    @Inject(forwardRef(() => ChatGateway))
    private readonly chatGateway: ChatGateway,
  ) {}

  async createAndDispatch(userId: string, dto: CreateNotificationDto) {
    // 1. Persist to DB
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        type: dto.type,
        title: dto.title,
        body: dto.body,
        data: dto.data,
      },
    });

    // 2. Emit via socket
    this.chatGateway.emitToUser(userId, 'notification:new', notification);

    // 3. Queue FCM push notification
    await this.notificationQueue.add('send-fcm', { userId, notification });

    return notification;
  }

  async findAll(userId: string, page = 1, limit = 20, unreadOnly = false) {
    const skip = (page - 1) * limit;
    const where: Prisma.NotificationWhereInput = {
      userId,
      ...(unreadOnly && { isRead: false }),
    };

    const notifications = await this.prisma.notification.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    const total = await this.prisma.notification.count({ where });
    const totalUnread = await this.prisma.notification.count({
      where: { userId, isRead: false },
    });

    return {
      data: notifications,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit), totalUnread },
    };
  }

  async markRead(id: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification || notification.userId !== userId) {
      return null;
    }

    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  async registerDeviceToken(userId: string, token: string, platform: string) {
    return this.prisma.deviceToken.upsert({
      where: { token },
      create: { userId, token, platform },
      update: { userId, platform },
    });
  }
}
