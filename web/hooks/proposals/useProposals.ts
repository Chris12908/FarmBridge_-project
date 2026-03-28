import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { proposalService } from '@/services/proposal.service';
import { chatService } from '@/services/chat.service';

export function useProposals(sessionId: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.PROPOSALS.list(sessionId),
    queryFn: () => proposalService.getProposals(sessionId),
    enabled: !!sessionId,
  });

  // Refresh when a proposal is updated via socket
  useEffect(() => {
    const cleanup = chatService.onProposalUpdated(() => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROPOSALS.list(sessionId),
      });
    });
    return cleanup;
  }, [sessionId, queryClient]);

  return { proposals: data ?? [], isLoading, error };
}
