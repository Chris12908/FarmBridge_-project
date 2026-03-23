// ─── Typed Route Map ──────────────────────────────────────────────────────────
// Single source of truth for all frontend URLs.
// Components import from here — no magic URL strings in pages.

export const routes = {
  home: () => '/' as const,

  auth: {
    root: () => '/auth' as const,
    login: () => '/auth/login' as const,
    buyerSignup: () => '/auth/buyer/signup' as const,
    farmerSignup: () => '/auth/farmer/signup' as const,
    farmerProfile: () => '/auth/farmer/profile' as const,
    callback: () => '/auth/callback' as const,
    forgotPassword: () => '/auth/forgot-password' as const,
    resetPassword: () => '/auth/reset-password' as const,
    verifyEmail: () => '/auth/verify-email' as const,
  },

  buyer: {
    root: () => '/buyer' as const,
    marketplace: () => '/buyer/marketplace' as const,
    search: (q?: string) =>
      q ? `/buyer/search?q=${encodeURIComponent(q)}` : '/buyer/search',
    product: (id: string) => `/buyer/product/${id}`,
    farmer: (id: string) => `/buyer/farmer/${id}`,
    chat: (sessionId: string) => `/buyer/chat/${sessionId}`,
    chats: () => '/buyer/chats' as const,
    checkout: (sessionId: string) => `/buyer/checkout/${sessionId}`,
    orderConfirmation: (orderId: string) =>
      `/buyer/order-confirmation/${orderId}`,
    order: (id: string) => `/buyer/order/${id}`,
    orders: () => '/buyer/orders' as const,
    notifications: () => '/buyer/notifications' as const,
    profile: () => '/buyer/profile' as const,
    settings: () => '/buyer/settings' as const,
  },

  farmer: {
    root: () => '/farmer' as const,
    dashboard: () => '/farmer/dashboard' as const,
    listings: () => '/farmer/listings' as const,
    newListing: () => '/farmer/listings/new' as const,
    listing: (id: string) => `/farmer/listing/${id}`,
    editListing: (id: string) => `/farmer/listing/${id}/edit`,
    orders: () => '/farmer/orders' as const,
    order: (id: string) => `/farmer/orders/${id}`,
    chats: () => '/farmer/chats' as const,
    chat: (sessionId: string) => `/farmer/chats/${sessionId}`,
    notifications: () => '/farmer/notifications' as const,
    profile: () => '/farmer/profile' as const,
    settings: () => '/farmer/settings' as const,
  },
} as const;
