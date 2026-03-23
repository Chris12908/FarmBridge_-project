# GiveData — Backend ↔ Frontend Integration Analysis

> Last updated: 2026-03-20
> Backend: NestJS (port 3001) | Frontend: Next.js App Router (port 3000)
> Legend: ✅ Fully integrated | ⚠️ Partial (service exists, UI gap) | ❌ Not integrated

---

## 1. HTTP Endpoints (48 total)

### AUTH — `/auth` (13 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `POST /auth/register/buyer` | ✅ | `/auth/buyer/signup/page.tsx` → `useRegister` |
| `POST /auth/register/farmer` | ✅ | `/auth/farmer/signup/page.tsx` → `useRegister` |
| `POST /auth/farmer/complete-profile` | ✅ | `/auth/farmer/profile/page.tsx` → `authService.completeFarmerProfile` |
| `POST /auth/login` | ✅ | `/auth/login/page.tsx` → `useLogin` |
| `GET /auth/google` | ✅ | `/auth/login/page.tsx` → redirect link to backend |
| `GET /auth/google/callback` | ✅ | Backend redirects to `/auth/callback` → `page.tsx` reads tokens |
| `POST /auth/refresh` | ✅ | `lib/axios.ts` interceptor auto-refreshes on 401 |
| `POST /auth/logout` | ✅ | Profile pages → `authService.logout` + `clearAuth()` |
| `POST /auth/forgot-password` | ✅ | `/auth/forgot-password/page.tsx` → `usePasswordReset` |
| `POST /auth/reset-password` | ✅ | `/auth/reset-password/page.tsx` → `usePasswordReset` |
| `GET /auth/verify-email/:token` | ✅ | `/auth/verify-email/page.tsx` → `authService.verifyEmail` |
| `PATCH /auth/change-password` | ✅ | `/farmer/settings/page.tsx` → `authService.changePassword` |
| `GET /auth/me` | ✅ | `AuthProvider` on mount + OAuth callback |

### USERS — `/users` (2 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `GET /users/profile` | ✅ | `userService.getProfile` (used in settings) |
| `PATCH /users/profile` | ✅ | Buyer settings & farmer settings → `userService.updateProfile` |

### FARMERS — `/farmers` (3 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `GET /farmers/featured` | ✅ | Marketplace → `useFeaturedFarmers` |
| `GET /farmers/:id` | ✅ | `/buyer/farmer/[farmerId]/page.tsx` → `useFarmer` |
| `PATCH /farmers/profile` | ✅ | `/farmer/settings/page.tsx` → `farmerService.updateFarmerProfile` |

### PRODUCTS — `/products` (10 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `GET /products` | ✅ | Marketplace → `useProducts` |
| `GET /products/featured` | ✅ | Home page → `useFeaturedProducts` |
| `GET /products/autocomplete` | ✅ | Search bar → `useProductAutocomplete` |
| `GET /products/farmer/:farmerId` | ✅ | `/farmer/listings/page.tsx` → `useFarmerProducts` |
| `GET /products/:id` | ✅ | `/buyer/product/[productId]/page.tsx` → `useProduct` |
| `POST /products` | ✅ | `/farmer/listings/new/page.tsx` → `useManageProduct().create` |
| `PATCH /products/:id` | ✅ | `/farmer/listing/[listingId]/edit/page.tsx` → `useManageProduct().update` |
| `PATCH /products/:id/status` | ✅ | Farmer listings → `productService.updateProductStatus` |
| `PATCH /products/:id/renew` | ✅ | Farmer listings → `useManageProduct().renew` |
| `DELETE /products/:id` | ✅ | Farmer listings → `useManageProduct().remove` |

### ORDERS — `/orders` (5 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `GET /orders` | ✅ | `/buyer/orders/page.tsx`, `/farmer/orders/page.tsx` → `useOrders` |
| `GET /orders/:id` | ✅ | Order detail pages → `useOrder` |
| `POST /orders` | ✅ | Checkout → `orderService.createOrder` |
| `PATCH /orders/:id/status` | ✅ | `/farmer/orders/[orderId]/page.tsx` → `orderService.updateOrderStatus` |
| `DELETE /orders/:id` | ✅ | `/buyer/order/[orderId]/page.tsx` → `orderService.cancelOrder` |

### NEGOTIATIONS — `/negotiations` (4 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `POST /negotiations` | ✅ | Product detail → `useStartNegotiation` |
| `GET /negotiations` | ✅ | Chats inbox → `useChatInbox` / `useNegotiations` |
| `GET /negotiations/:id` | ✅ | Chat pages → `negotiationService.getNegotiation` |
| `PATCH /negotiations/:id/status` | ✅ | `negotiationService.updateNegotiationStatus` (called on accept/decline) |

### PRICE PROPOSALS — `/negotiations/:sessionId/proposals` (3 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `GET /negotiations/:sessionId/proposals` | ✅ | Chat pages → `useProposals` |
| `POST /negotiations/:sessionId/proposals` | ✅ | Chat pages → `useSendProposal().sendProposal` |
| `PATCH /negotiations/:sessionId/proposals/:proposalId/respond` | ✅ | `PriceProposalCard` → accept/decline/counter via `useSendProposal().respondToProposal` |

### MESSAGES — `/negotiations/:sessionId/messages` (2 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `GET /negotiations/:sessionId/messages` | ✅ | `useChat` → `messageService.getMessages` (cursor pagination supported) |
| `PATCH /negotiations/:sessionId/messages/read` | ✅ | `useChat` unmount + `markRead()` → `messageService.markMessagesRead` |

### PAYMENTS — `/payments` (2 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `POST /payments/stripe/initiate` | ✅ | Checkout step 2 → `paymentService.initiateStripePayment` → `StripePaymentForm` |
| `POST /payments/flutterwave/initiate` | ✅ | Checkout step 2 → `paymentService.initiateFlutterwavePayment` → redirect |

### PAYMENT WEBHOOKS (handled server-side only)

| Endpoint | Status | Notes |
|----------|--------|-------|
| `POST /webhooks/stripe` | ✅ | Backend only — updates order `paymentStatus` |
| `POST /webhooks/flutterwave` | ✅ | Backend only — updates order `paymentStatus` |

### NOTIFICATIONS — `/notifications` (4 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `GET /notifications` | ✅ | Notification pages → `useNotifications` |
| `PATCH /notifications/:id/read` | ✅ | Notification pages → `notificationService.markNotificationRead` |
| `PATCH /notifications/read-all` | ✅ | Notification pages → `notificationService.markAllRead` |
| `POST /notifications/device-token` | ❌ | `notificationService.registerDeviceToken` exists — never called (no push notification setup UI) |

### ADDRESSES — `/addresses` (5 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `GET /addresses` | ✅ | Checkout, buyer settings → `useAddresses` |
| `POST /addresses` | ✅ | Checkout inline form, buyer settings → `addressService.createAddress` |
| `PATCH /addresses/:id` | ✅ | Buyer settings edit → `addressService.updateAddress` |
| `DELETE /addresses/:id` | ✅ | Buyer settings → `addressService.deleteAddress` |
| `PATCH /addresses/:id/default` | ✅ | Buyer settings → `addressService.setDefaultAddress` (Set Default button) |

### REVIEWS — `/reviews` (3 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `POST /reviews` | ✅ | Order detail (delivered state) → `ReviewForm` → `reviewService.submitReview` |
| `GET /reviews/farmer/:farmerId` | ✅ | Farmer profile → `useFarmerReviews` |
| `GET /reviews/order/:orderId` | ✅ | Order detail → `reviewService.getOrderReview` |

### DASHBOARD — `/dashboard` (2 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `GET /dashboard/farmer` | ✅ | `/farmer/dashboard/page.tsx` → `useFarmerDashboard` |
| `GET /dashboard/buyer` | ✅ | `/buyer/dashboard/page.tsx` → `useBuyerDashboard` |

### UPLOADS — `/uploads` (3 endpoints)

| Endpoint | Status | Frontend Location |
|----------|--------|-------------------|
| `POST /uploads/image` | ✅ | Settings avatar upload, product images → `useUpload().uploadImage` |
| `POST /uploads/voice-note` | ✅ | `VoiceNoteRecorder` → `useUpload().uploadVoiceNote` |
| `DELETE /uploads/:publicId` | ⚠️ | `uploadService.deleteUpload` exists — not called on product/note deletion |

---

## 2. WebSocket Events

### Client → Server

| Event | Status | Where Sent |
|-------|--------|------------|
| `chat:join_session` | ✅ | `useChat` on mount (once per session) |
| `chat:send_message` | ✅ | Chat pages → `chatService.sendMessage` (text + voice notes) |
| `chat:mark_read` | ✅ | `useChat` on unmount + explicit `markRead()` call |
| `chat:typing` | ✅ | Chat input `onChange` → `chatService.sendTyping(true)` with 3s auto-clear timeout |

### Server → Client

| Event | Status | Handler |
|-------|--------|---------|
| `chat:session_joined` | ✅ | `chatService.onSessionJoined` in `useChat` |
| `chat:message` | ✅ | `chatService.onMessage` in `useChat` — deduped by ID, appended to state |
| `chat:message_read` | ✅ | `chatService.onMessageRead` in `useChat` |
| `chat:error` | ✅ | `chatService.onError` in `useChat` |
| `user:typing` | ✅ | `chatService.onTyping` in `useChat` — updates `typingUsers` state |
| `notification:new` | ✅ | `SocketProvider` → invalidates notifications cache + toast |
| `order:status_changed` | ✅ | `SocketProvider` → invalidates order queries + toast |
| `payment:confirmed` | ✅ | `SocketProvider` → invalidates order queries + success toast |
| `proposal:updated` | ✅ | `SocketProvider` → invalidates `['proposals']` queries |

---

## 3. Voice Notes — Full Flow

| Step | Status | Detail |
|------|--------|--------|
| Recording | ✅ | `VoiceNoteRecorder` uses `MediaRecorder` API, records as `audio/webm` |
| Upload | ✅ | `POST /uploads/voice-note` via `useUpload().uploadVoiceNote` with progress |
| Sending | ✅ | `chat:send_message` with `type: VOICE_NOTE`, `voiceNoteUrl`, `voiceNoteDurationSecs` |
| Persistence | ✅ | Backend stores URL + duration on the `Message` record |
| Playback | ✅ | `VoiceNotePlayer` receives `voiceNoteUrl` prop, uses `<audio>` element for real playback |

---

## 4. Chat Pagination

| Feature | Status | Detail |
|---------|--------|--------|
| Initial load | ✅ | `messageService.getMessages(sessionId)` — most recent messages |
| Load older messages | ✅ | "Load older messages" button at top of chat → `useChat().loadMore()` |
| Cursor tracking | ✅ | `useChat` tracks `nextCursor`, `hasMore`, `isLoadingMore` |
| Real-time new messages | ✅ | Socket `chat:message` event appends to bottom |

---

## 5. Pages Coverage

### Buyer Pages (15 total)

| Route | Status | Notes |
|-------|--------|-------|
| `/buyer/dashboard` | ✅ | Stats, recent orders, activity feed |
| `/buyer/marketplace` | ✅ | Product search + filters |
| `/buyer/search` | ✅ | Search results page |
| `/buyer/product/[productId]` | ✅ | Product detail + start negotiation |
| `/buyer/farmer/[farmerId]` | ✅ | Farmer storefront + reviews list |
| `/buyer/chats` | ✅ | Chat inbox (negotiation sessions) |
| `/buyer/chat/[sessionId]` | ✅ | Real-time chat, proposals, voice notes, load more |
| `/buyer/checkout/[sessionId]` | ✅ | 2-step: address + payment (Stripe/Flutterwave) |
| `/buyer/order-confirmation/[orderId]` | ✅ | Payment status, order summary |
| `/buyer/orders` | ✅ | Orders list |
| `/buyer/order/[orderId]` | ✅ | Order detail, cancel, review |
| `/buyer/notifications` | ✅ | All/Unread/Messages tabs, real-time |
| `/buyer/profile` | ✅ | Profile display + logout |
| `/buyer/settings` | ✅ | Edit profile, avatar, addresses + set default |

### Farmer Pages (12 total)

| Route | Status | Notes |
|-------|--------|-------|
| `/farmer/dashboard` | ✅ | Stats, recent orders, quick actions |
| `/farmer/listings` | ✅ | Listings by status, edit/renew/delete actions |
| `/farmer/listings/new` | ✅ | Create listing with image upload |
| `/farmer/listing/[listingId]/edit` | ✅ | Edit listing, pre-filled form |
| `/farmer/chats` | ✅ | Chat inbox |
| `/farmer/chats/[sessionId]` | ✅ | Real-time chat, proposals, voice notes, load more |
| `/farmer/orders` | ✅ | Orders list |
| `/farmer/orders/[orderId]` | ✅ | Order detail + status update (Confirm/Dispatch/Deliver) |
| `/farmer/notifications` | ✅ | All/Unread tabs, real-time |
| `/farmer/profile` | ✅ | Profile display + logout |
| `/farmer/settings` | ✅ | Edit profile, farm info, avatar, password change |

### Auth Pages (9 total) — All ✅

`/auth/login`, `/auth/buyer/signup`, `/auth/farmer/signup`, `/auth/farmer/profile`, `/auth/callback`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/verify-email`

---

## 6. Summary

| Category | Total | ✅ Done | ⚠️ Partial | ❌ Missing |
|----------|-------|---------|-----------|----------|
| HTTP Endpoints | 48 | 46 | 2 | 1 |
| WebSocket Events (sent) | 4 | 4 | 0 | 0 |
| WebSocket Events (received) | 9 | 9 | 0 | 0 |
| Pages | 26 | 26 | 0 | 0 |

### Partial Integrations
- `DELETE /uploads/:publicId` — service exists, not called on deletion
- ~~`PATCH /addresses/:id/default`~~ — **now wired** (Set Default button added)

### Not Integrated
- `POST /notifications/device-token` — push notification device registration (requires native app or PWA setup; out of scope for web)
