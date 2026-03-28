import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { QUERY_KEYS } from '@/lib/constants';
import { routes } from '@/lib/routes';
import { orderService } from '@/services/order.service';
import type { CreateOrderDto } from '@/lib/types/order.types';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (dto: CreateOrderDto) => orderService.createOrder(dto),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.all });
      router.push(routes.buyer.orderConfirmation(order.id));
    },
  });

  return {
    createOrder: mutation.mutate,
    createOrderAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
