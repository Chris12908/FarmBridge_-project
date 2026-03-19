import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FcmService {
  constructor(private readonly configService: ConfigService) {
    if (!admin.apps.length) {
      const projectId = this.configService.get<string>('firebase.projectId');
      const privateKey = this.configService.get<string>('firebase.privateKey');
      const clientEmail = this.configService.get<string>(
        'firebase.clientEmail',
      );

      if (projectId && privateKey && clientEmail) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            privateKey: privateKey.replace(/\\n/g, '\n'),
            clientEmail,
          }),
        });
      }
    }
  }

  async sendPush(
    token: string,
    notification: { title: string; body: string },
    data: Record<string, string> = {},
  ) {
    try {
      const message: admin.messaging.Message = {
        token,
        notification: {
          title: notification.title,
          body: notification.body,
        },
        data,
      };

      const response = await admin.messaging().send(message);
      return { success: true, messageId: response };
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      // Handle expired/invalid tokens
      if (
        firebaseError.code === 'messaging/registration-token-not-registered' ||
        firebaseError.code === 'messaging/invalid-registration-token'
      ) {
        return { success: false, expired: true, error: firebaseError.message };
      }
      return { success: false, error: firebaseError.message };
    }
  }
}
