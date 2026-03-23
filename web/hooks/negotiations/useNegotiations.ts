import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { negotiationService } from '@/services/negotiation.service';
import { chatService } from '@/services/chat.service';
import type { NegotiationStatus } from '@/lib/types/negotiation.types';

export function useNegotiations(status?: NegotiationStatus) {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.NEGOTIATIONS.list(status),
    queryFn: () => negotiationService.listNegotiations(status),
  });

  // Refresh inbox when a new message arrives so unread counts update live
  useEffect(() => {
    const cleanup = chatService.onMessage(() => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NEGOTIATIONS.all,
      });
    });
    return cleanup;
  }, [queryClient]);

  return { sessions: data ?? [], isLoading, error, refetch };
}
