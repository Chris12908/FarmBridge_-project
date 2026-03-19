import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';
import { FcmService } from './fcm.service';

interface NotificationJobData {
  userId: string;
  notification: {
    title: string;
    body: string;
    data?: Record<string, unknown>;
  };
}

@Processor('notification-queue')
export class NotificationsProcessor extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fcmService: FcmService,
  ) {
    super();
  }

  async process(job: Job<NotificationJobData>) {
    const { userId, notification } = job.data;

    // Get user's device tokens
    const deviceTokens = await this.prisma.deviceToken.findMany({
      where: { userId },
    });

    if (!deviceTokens.length) return;

    const pushData: Record<string, string> = {};
    if (notification.data) {
      Object.entries(notification.data).forEach(([key, value]) => {
        pushData[key] = String(value);
      });
    }

    // Send FCM to all registered tokens
    const results = await Promise.allSettled(
      deviceTokens.map((dt) =>
        this.fcmService.sendPush(
          dt.token,
          { title: notification.title, body: notification.body },
          pushData,
        ),
      ),
    );

    // Remove expired tokens
    const expiredTokens: string[] = [];
    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.expired) {
        expiredTokens.push(deviceTokens[index].token);
      }
    });

    if (expiredTokens.length > 0) {
      await this.prisma.deviceToken.deleteMany({
        where: { token: { in: expiredTokens } },
      });
    }
  }
}
