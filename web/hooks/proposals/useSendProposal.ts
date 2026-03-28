import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { proposalService } from '@/services/proposal.service';
import type { CreateProposalDto } from '@/lib/types/negotiation.types';

export function useSendProposal(sessionId: string) {
  const queryClient = useQueryClient();

  function invalidate() {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.PROPOSALS.list(sessionId),
    });
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.NEGOTIATIONS.detail(sessionId),
    });
  }

  const sendProposal = useMutation({
    mutationFn: (dto: CreateProposalDto) =>
      proposalService.sendProposal(sessionId, dto),
    onSuccess: invalidate,
  });

  const respondToProposal = useMutation({
    mutationFn: ({
      proposalId,
      action,
      counterPrice,
      counterQuantity,
      counterNote,
    }: {
      proposalId: string;
      action: 'accept' | 'decline' | 'counter';
      counterPrice?: number;
      counterQuantity?: number;
      counterNote?: string;
    }) =>
      proposalService.respondToProposal(sessionId, proposalId, action, {
        counterPrice,
        counterQuantity,
        counterNote,
      }),
    onSuccess: invalidate,
  });

  return { sendProposal, respondToProposal };
}
