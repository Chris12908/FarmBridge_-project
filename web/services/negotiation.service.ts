import axiosClient from '@/lib/axios';
import type {
  NegotiationSession,
  NegotiationStatus,
} from '@/lib/types/negotiation.types';

export const negotiationService = {
  async startNegotiation(productId: string): Promise<NegotiationSession> {
    const { data } = await axiosClient.post<NegotiationSession>(
      '/negotiations',
      { productId }
    );
    return data;
  },

  async listNegotiations(
    status?: NegotiationStatus
  ): Promise<NegotiationSession[]> {
    const qs = status ? `?status=${status}` : '';
    const { data } = await axiosClient.get<NegotiationSession[]>(
      `/negotiations${qs}`
    );
    return data;
  },

  async getNegotiation(id: string): Promise<NegotiationSession> {
    const { data } = await axiosClient.get<NegotiationSession>(
      `/negotiations/${id}`
    );
    return data;
  },

  async updateNegotiationStatus(
    id: string,
    status: NegotiationStatus
  ): Promise<NegotiationSession> {
    const { data } = await axiosClient.patch<NegotiationSession>(
      `/negotiations/${id}/status`,
      { status }
    );
    return data;
  },
};
