import axiosClient from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';
import type {
  CreateOrderDto,
  Order,
  OrderQueryParams,
  OrderStatus,
} from '@/lib/types/order.types';
import type { PaginatedData } from '@/lib/types/api.types';

export const orderService = {
  async listOrders(
    params?: OrderQueryParams
  ): Promise<PaginatedData<Order>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    const { data } = await axiosClient.get<PaginatedData<Order>>(
      `/orders${qs}`
    );
    return data;
  },

  async getOrder(id: string): Promise<Order> {
    const { data } = await axiosClient.get<Order>(`/orders/${id}`);
    return data;
  },

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const { data } = await axiosClient.post<Order>('/orders', dto);
    return data;
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const { data } = await axiosClient.patch<Order>(`/orders/${id}/status`, {
      status,
    });
    return data;
  },

  async cancelOrder(id: string): Promise<void> {
    await axiosClient.delete(`/orders/${id}`);
  },
};
