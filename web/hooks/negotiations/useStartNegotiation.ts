import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { QUERY_KEYS } from '@/lib/constants';
import { routes } from '@/lib/routes';
import { negotiationService } from '@/services/negotiation.service';
import { useAuth } from '@/hooks/auth/useAuth';

export function useStartNegotiation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isBuyer } = useAuth();

  const mutation = useMutation({
    mutationFn: (productId: string) =>
      negotiationService.startNegotiation(productId),
    onSuccess: (session) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NEGOTIATIONS.all,
      });
      // Navigate to the appropriate chat route based on role
      const chatRoute = isBuyer
        ? routes.buyer.chat(session.id)
        : routes.farmer.chat(session.id);
      router.push(chatRoute);
    },
  });

  return {
    startNegotiation: mutation.mutate,
    startNegotiationAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
