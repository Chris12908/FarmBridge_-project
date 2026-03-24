// ─── Environment ─────────────────────────────────────────────────────────────

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:3001';

export const GOOGLE_OAUTH_URL =
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL ??
  'http://localhost:3001/api/auth/google';

// ─── Token Storage Keys ───────────────────────────────────────────────────────

export const TOKEN_KEYS = {
  ACCESS: 'fb_access_token',
  REFRESH: 'fb_refresh_token',
  USER: 'fb_user',
  ROLE: 'fb_role',
} as const;

// ─── Socket Event Names ───────────────────────────────────────────────────────

export const SOCKET_EVENTS = {
  // Client → Server
  JOIN_SESSION: 'chat:join_session',
  SEND_MESSAGE: 'chat:send_message',
  MARK_READ: 'chat:mark_read',
  TYPING: 'chat:typing',

  // Server → Client (chat)
  SESSION_JOINED: 'chat:session_joined',
  MESSAGE: 'chat:message',
  MESSAGE_READ: 'chat:message_read',
  ERROR: 'chat:error',

  // Server → Client (inbox refresh)
  INBOX_UPDATE: 'chat:inbox_update',
  DEAL_ACCEPTED: 'chat:deal_accepted',

  // Server → Client (user room)
  USER_TYPING: 'user:typing',
  NOTIFICATION_NEW: 'notification:new',
  ORDER_STATUS_CHANGED: 'order:status_changed',
  PAYMENT_CONFIRMED: 'payment:confirmed',
  PROPOSAL_UPDATED: 'proposal:updated',
} as const;

// ─── Pagination Defaults ──────────────────────────────────────────────────────

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const CHAT_MESSAGE_LIMIT = 30;

// ─── TanStack Query Keys ──────────────────────────────────────────────────────

export const QUERY_KEYS = {
  AUTH: {
    me: ['auth', 'me'] as const,
  },
  PRODUCTS: {
    all: ['products'] as const,
    list: (query: Record<string, unknown>) => ['products', 'list', query] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
    featured: ['products', 'featured'] as const,
    farmerProducts: (farmerId: string, status?: string) =>
      ['products', 'farmer', farmerId, status] as const,
    autocomplete: (q: string) => ['products', 'autocomplete', q] as const,
  },
  FARMERS: {
    all: ['farmers'] as const,
    featured: ['farmers', 'featured'] as const,
    detail: (id: string) => ['farmers', 'detail', id] as const,
  },
  NEGOTIATIONS: {
    all: ['negotiations'] as const,
    list: (status?: string) => ['negotiations', 'list', status] as const,
    detail: (id: string) => ['negotiations', 'detail', id] as const,
  },
  MESSAGES: {
    list: (sessionId: string) => ['messages', sessionId] as const,
  },
  PROPOSALS: {
    list: (sessionId: string) => ['proposals', sessionId] as const,
  },
  ORDERS: {
    all: ['orders'] as const,
    list: (params?: Record<string, unknown>) => ['orders', 'list', params] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
  ADDRESSES: {
    all: ['addresses'] as const,
  },
  REVIEWS: {
    farmer: (farmerId: string, page?: number) =>
      ['reviews', 'farmer', farmerId, page] as const,
    order: (orderId: string) => ['reviews', 'order', orderId] as const,
  },
  NOTIFICATIONS: {
    all: ['notifications'] as const,
    list: (params?: Record<string, unknown>) =>
      ['notifications', 'list', params] as const,
  },
  DASHBOARD: {
    farmer: ['dashboard', 'farmer'] as const,
    buyer: ['dashboard', 'buyer'] as const,
  },
} as const;
