import axiosClient from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';
import type {
  AppNotification,
  NotificationQueryParams,
} from '@/lib/types/notification.types';
import type { PaginatedData } from '@/lib/types/api.types';

export const notificationService = {
  async getNotifications(
    params?: NotificationQueryParams
  ): Promise<PaginatedData<AppNotification>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    const { data } = await axiosClient.get<PaginatedData<AppNotification>>(
      `/notifications${qs}`
    );
    return data;
  },

  async markNotificationRead(id: string): Promise<void> {
    await axiosClient.patch(`/notifications/${id}/read`);
  },

  async markAllRead(): Promise<void> {
    await axiosClient.patch('/notifications/read-all');
  },

  async registerDeviceToken(
    token: string,
    platform: 'web' | 'android' | 'ios'
  ): Promise<void> {
    await axiosClient.post('/notifications/device-token', { token, platform });
  },
};
