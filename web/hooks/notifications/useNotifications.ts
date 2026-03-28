import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { notificationService } from '@/services/notification.service';
import { chatService } from '@/services/chat.service';
import type { NotificationQueryParams } from '@/lib/types/notification.types';

export function useNotifications(params?: NotificationQueryParams) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.NOTIFICATIONS.list(
      params as Record<string, unknown>
    ),
    queryFn: () => notificationService.getNotifications(params),
  });

  // Refresh on new notification from socket
  useEffect(() => {
    const cleanup = chatService.onNotification(() => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NOTIFICATIONS.all,
      });
    });
    return cleanup;
  }, [queryClient]);

  const markRead = useMutation({
    mutationFn: (id: string) => notificationService.markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS.all });
    },
  });

  const markAllRead = useMutation({
    mutationFn: notificationService.markAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS.all });
    },
  });

  return {
    notifications: data?.items ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
    markRead,
    markAllRead,
  };
}
