import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { orderService } from '@/services/order.service';
import { chatService } from '@/services/chat.service';

export function useOrder(id: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.ORDERS.detail(id),
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  // Live order status updates
  useEffect(() => {
    const offStatus = chatService.onOrderStatusChanged(({ orderId }) => {
      if (orderId === id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.ORDERS.detail(id),
        });
      }
    });

    const offPayment = chatService.onPaymentConfirmed(({ orderId }) => {
      if (orderId === id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.ORDERS.detail(id),
        });
      }
    });

    return () => {
      offStatus();
      offPayment();
    };
  }, [id, queryClient]);

  return { order: data, isLoading, error };
}
