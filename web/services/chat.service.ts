import { getSocket } from '@/lib/socket';
import { SOCKET_EVENTS } from '@/lib/constants';
import type { ChatMessage, SendMessageDto } from '@/lib/types/negotiation.types';
import type { ProposalStatus } from '@/lib/types/negotiation.types';
import type { AppNotification } from '@/lib/types/notification.types';
import type { OrderStatus, PaymentStatus } from '@/lib/types/order.types';

// ─── Emit Helpers ─────────────────────────────────────────────────────────────

export const chatService = {
  joinSession(sessionId: string): void {
    getSocket()?.emit(SOCKET_EVENTS.JOIN_SESSION, { sessionId });
  },

  sendMessage(dto: SendMessageDto): void {
    getSocket()?.emit(SOCKET_EVENTS.SEND_MESSAGE, dto);
  },

  markRead(sessionId: string): void {
    getSocket()?.emit(SOCKET_EVENTS.MARK_READ, { sessionId });
  },

  sendTyping(sessionId: string, isTyping: boolean): void {
    getSocket()?.emit(SOCKET_EVENTS.TYPING, { sessionId, isTyping });
  },

  // ─── Subscribe Helpers ──────────────────────────────────────────────────────
  // Each returns a cleanup function to remove the listener.

  onMessage(cb: (msg: ChatMessage) => void): () => void {
    const socket = getSocket();
    socket?.on(SOCKET_EVENTS.MESSAGE, cb);
    return () => socket?.off(SOCKET_EVENTS.MESSAGE, cb);
  },

  onTyping(
    cb: (data: { userId: string; sessionId: string; isTyping: boolean }) => void
  ): () => void {
    const socket = getSocket();
    socket?.on(SOCKET_EVENTS.USER_TYPING, cb);
    return () => socket?.off(SOCKET_EVENTS.USER_TYPING, cb);
  },

  onMessageRead(cb: (data: { sessionId: string }) => void): () => void {
    const socket = getSocket();
    socket?.on(SOCKET_EVENTS.MESSAGE_READ, cb);
    return () => socket?.off(SOCKET_EVENTS.MESSAGE_READ, cb);
  },

  onSessionJoined(
    cb: (data: { sessionId: string; messages: ChatMessage[] }) => void
  ): () => void {
    const socket = getSocket();
    socket?.on(SOCKET_EVENTS.SESSION_JOINED, cb);
    return () => socket?.off(SOCKET_EVENTS.SESSION_JOINED, cb);
  },

  onError(cb: (error: { message: string }) => void): () => void {
    const socket = getSocket();
    socket?.on(SOCKET_EVENTS.ERROR, cb);
    return () => socket?.off(SOCKET_EVENTS.ERROR, cb);
  },

  onNotification(cb: (notification: AppNotification) => void): () => void {
    const socket = getSocket();
    socket?.on(SOCKET_EVENTS.NOTIFICATION_NEW, cb);
    return () => socket?.off(SOCKET_EVENTS.NOTIFICATION_NEW, cb);
  },

  onOrderStatusChanged(
    cb: (data: { orderId: string; status: OrderStatus }) => void
  ): () => void {
    const socket = getSocket();
    socket?.on(SOCKET_EVENTS.ORDER_STATUS_CHANGED, cb);
    return () => socket?.off(SOCKET_EVENTS.ORDER_STATUS_CHANGED, cb);
  },

  onPaymentConfirmed(
    cb: (data: { orderId: string; status: PaymentStatus }) => void
  ): () => void {
    const socket = getSocket();
    socket?.on(SOCKET_EVENTS.PAYMENT_CONFIRMED, cb);
    return () => socket?.off(SOCKET_EVENTS.PAYMENT_CONFIRMED, cb);
  },

  onProposalUpdated(
    cb: (data: { proposalId: string; status: ProposalStatus }) => void
  ): () => void {
    const socket = getSocket();
    socket?.on(SOCKET_EVENTS.PROPOSAL_UPDATED, cb);
    return () => socket?.off(SOCKET_EVENTS.PROPOSAL_UPDATED, cb);
  },
};
