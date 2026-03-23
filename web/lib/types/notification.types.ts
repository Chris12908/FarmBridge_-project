// ─── Enums ────────────────────────────────────────────────────────────────────

export enum NotificationType {
  NEW_MESSAGE = 'NEW_MESSAGE',
  PRICE_PROPOSAL = 'PRICE_PROPOSAL',
  OFFER_ACCEPTED = 'OFFER_ACCEPTED',
  OFFER_DECLINED = 'OFFER_DECLINED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  ORDER_DISPATCHED = 'ORDER_DISPATCHED',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  REVIEW_REQUEST = 'REVIEW_REQUEST',
  LISTING_EXPIRING = 'LISTING_EXPIRING',
  SYSTEM = 'SYSTEM',
}

// ─── Notification ─────────────────────────────────────────────────────────────

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface NotificationQueryParams {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}
