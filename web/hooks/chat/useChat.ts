'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { messageService } from '@/services/message.service';
import { chatService } from '@/services/chat.service';
import { useSocket } from '@/providers/SocketProvider';
import type { ChatMessage, SendMessageDto } from '@/lib/types/negotiation.types';
import { useAuth } from '@/hooks/auth/useAuth';
import { toast } from 'sonner';

export function useChat(sessionId: string) {
  const { isConnected } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  // Initial message fetch — single query, derive isLoading from it
  const { data: initialData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.MESSAGES.list(sessionId),
    queryFn: () => messageService.getMessages(sessionId),
    enabled: !!sessionId,
    staleTime: 0,
  });

  useEffect(() => {
    if (initialData && messages.length === 0) {
      setMessages(initialData.items);
      setNextCursor(initialData.nextCursor);
      setHasMore(initialData.hasMore);
    }
  }, [initialData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Join session room every time the socket reconnects (idempotent on server)
  useEffect(() => {
    if (!sessionId || !isConnected) return;
    chatService.joinSession(sessionId);
  }, [sessionId, isConnected]);

  // Socket subscriptions
  useEffect(() => {
    const offMessage = chatService.onMessage((msg) => {
      if (msg.sessionId === sessionId) {
        setMessages((prev) => {
          // Deduplicate by id
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      }
    });

    const offTyping = chatService.onTyping(({ userId, sessionId: sid, isTyping }) => {
      if (sid !== sessionId || userId === user?.id) return;
      setTypingUsers((prev) =>
        isTyping
          ? prev.includes(userId) ? prev : [...prev, userId]
          : prev.filter((id) => id !== userId)
      );
    });

    const offProposalUpdated = chatService.onProposalUpdated(({ proposalId, status }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.priceProposal?.id === proposalId
            ? { ...msg, priceProposal: { ...msg.priceProposal!, status } }
            : msg
        )
      );
    });

    return () => {
      offMessage();
      offTyping();
      offProposalUpdated();
    };
  }, [sessionId, user?.id]);

  // Mark read on mount/unmount
  useEffect(() => {
    return () => {
      if (sessionId) {
        messageService.markMessagesRead(sessionId).catch(() => null);
        chatService.markRead(sessionId);
      }
    };
  }, [sessionId]);

  function sendMessage(dto: Omit<SendMessageDto, 'sessionId'>) {
    if (!isConnected) {
      toast.error('No connection — please wait and retry');
      return;
    }
    chatService.sendMessage({ ...dto, sessionId });
  }

  async function loadMore() {
    if (!hasMore || isLoadingMore || !nextCursor) return;
    setIsLoadingMore(true);
    try {
      const result = await messageService.getMessages(sessionId, nextCursor);
      setMessages((prev) => [...result.items, ...prev]);
      setNextCursor(result.nextCursor);
      setHasMore(result.hasMore);
    } finally {
      setIsLoadingMore(false);
    }
  }

  function markRead() {
    messageService.markMessagesRead(sessionId).catch(() => null);
    chatService.markRead(sessionId);
  }

  return {
    messages,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    sendMessage,
    markRead,
    typingUsers,
    isConnected,
  };
}
