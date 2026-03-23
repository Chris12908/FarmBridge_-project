import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { negotiationService } from '@/services/negotiation.service';
import { chatService } from '@/services/chat.service';

export function useChatInbox() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.NEGOTIATIONS.list(),
    queryFn: () => negotiationService.listNegotiations(),
  });

  // When any new message arrives, refresh to update unread counts
  useEffect(() => {
    const cleanup = chatService.onMessage(() => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NEGOTIATIONS.all,
      });
    });
    return cleanup;
  }, [queryClient]);

  return { sessions: data ?? [], isLoading, error };
}
