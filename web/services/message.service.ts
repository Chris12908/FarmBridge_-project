import axiosClient from '@/lib/axios';
import { CHAT_MESSAGE_LIMIT } from '@/lib/constants';
import type { ChatMessage } from '@/lib/types/negotiation.types';
import type { CursorPaginatedData } from '@/lib/types/api.types';

export const messageService = {
  async getMessages(
    sessionId: string,
    cursor?: string,
    limit: number = CHAT_MESSAGE_LIMIT
  ): Promise<CursorPaginatedData<ChatMessage>> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (cursor) params.set('cursor', cursor);
    const { data } = await axiosClient.get<CursorPaginatedData<ChatMessage>>(
      `/negotiations/${sessionId}/messages?${params.toString()}`
    );
    return data;
  },

  async markMessagesRead(sessionId: string): Promise<void> {
    await axiosClient.patch(
      `/negotiations/${sessionId}/messages/read`
    );
  },
};
