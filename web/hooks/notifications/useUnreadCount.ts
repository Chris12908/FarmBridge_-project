import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { notificationService } from '@/services/notification.service';
import { chatService } from '@/services/chat.service';

export function useUnreadCount() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.NOTIFICATIONS.list({ unreadOnly: true }),
    queryFn: () => notificationService.getNotifications({ unreadOnly: true }),
    refetchInterval: 60_000, // poll every 60s as a fallback
  });

  useEffect(() => {
    const cleanup = chatService.onNotification(() => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NOTIFICATIONS.all,
      });
    });
    return cleanup;
  }, [queryClient]);

  return {
    unreadCount: data?.pagination?.total ?? 0,
    isLoading,
  };
}
