import axiosClient from '@/lib/axios';
import type {
  CreateProposalDto,
  PriceProposal,
} from '@/lib/types/negotiation.types';

export const proposalService = {
  async getProposals(sessionId: string): Promise<PriceProposal[]> {
    const { data } = await axiosClient.get<PriceProposal[]>(
      `/negotiations/${sessionId}/proposals`
    );
    return data;
  },

  async sendProposal(
    sessionId: string,
    dto: CreateProposalDto
  ): Promise<PriceProposal> {
    const { data } = await axiosClient.post<PriceProposal>(
      `/negotiations/${sessionId}/proposals`,
      dto
    );
    return data;
  },

  async respondToProposal(
    sessionId: string,
    proposalId: string,
    action: 'accept' | 'decline' | 'counter',
    counterFields?: { counterPrice?: number; counterQuantity?: number; counterNote?: string }
  ): Promise<PriceProposal> {
    const { data } = await axiosClient.patch<PriceProposal>(
      `/negotiations/${sessionId}/proposals/${proposalId}/respond`,
      { action, ...counterFields }
    );
    return data;
  },
};
