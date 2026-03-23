# Farm Bridge — Frontend Task Distribution

> Each member owns their domain. No file is shared. Every file is assigned to exactly one person.
> 6 tasks per person — each task = one commit/scrum card.

---

## MOSES

---

### Config & Project Setup
Initialize project configs and tooling.
**Assigned to: Moses**
Files:
- `web/package.json`
- `web/package-lock.json`
- `web/tsconfig.json`
- `web/tsconfig.tsbuildinfo`
- `web/next.config.ts`
- `web/next-env.d.ts`
- `web/components.json`
- `web/postcss.config.mjs`
- `web/eslint.config.mjs`
- `web/.gitignore`
- `web/README.md`

---

### Middleware & Environment
Auth middleware and environment variable setup.
**Assigned to: Moses**
Files:
- `web/middleware.ts`
- `web/.env.local`

---

### Root Layout & Global Styles
Root HTML layout, global CSS, and favicon.
**Assigned to: Moses**
Files:
- `web/app/layout.tsx`
- `web/app/globals.css`
- `web/app/favicon.ico`

---

### Landing Page Structure
Landing page route, layout, and nav/footer layout components.
**Assigned to: Moses**
Files:
- `web/app/(main)/layout.tsx`
- `web/app/(main)/page.tsx`
- `web/components/layout/nav.tsx`
- `web/components/layout/footer.tsx`

---

### Landing Page Components
Hero, features, how-it-works, and testimonials sections.
**Assigned to: Moses**
Files:
- `web/components/home/hero.tsx`
- `web/components/home/features.tsx`
- `web/components/home/how_it_works.tsx`
- `web/components/home/testimonial.tsx`

---

### Core Providers & Lib Utilities
Auth, query, socket providers plus all lib utilities and base types.
**Assigned to: Moses**
Files:
- `web/providers/AuthProvider.tsx`
- `web/providers/QueryProvider.tsx`
- `web/providers/SocketProvider.tsx`
- `web/lib/axios.ts`
- `web/lib/categories.ts`
- `web/lib/constants.ts`
- `web/lib/routes.ts`
- `web/lib/socket.ts`
- `web/lib/tokens.ts`
- `web/lib/utils.ts`
- `web/lib/types/api.types.ts`
- `web/lib/types/index.ts`

---

## NKINGI

---

### Auth Entry Pages
Auth layout, selection page, and login page.
**Assigned to: Nkingi**
Files:
- `web/app/auth/layout.tsx`
- `web/app/auth/page.tsx`
- `web/app/auth/login/page.tsx`

---

### Auth Signup Pages
Farmer and buyer registration pages plus farmer profile completion.
**Assigned to: Nkingi**
Files:
- `web/app/auth/farmer/signup/page.tsx`
- `web/app/auth/buyer/signup/page.tsx`
- `web/app/auth/farmer/profile/page.tsx`

---

### Password & Email Verification Pages
Forgot password, reset password, and email verification flows.
**Assigned to: Nkingi**
Files:
- `web/app/auth/forgot-password/page.tsx`
- `web/app/auth/reset-password/page.tsx`
- `web/app/auth/verify-email/page.tsx`

---

### Auth Hooks & Services
Login, register, password reset hooks plus auth and user services.
**Assigned to: Nkingi**
Files:
- `web/hooks/auth/useAuth.ts`
- `web/hooks/auth/useLogin.ts`
- `web/hooks/auth/useRegister.ts`
- `web/hooks/auth/usePasswordReset.ts`
- `web/services/auth.service.ts`
- `web/services/user.service.ts`
- `web/lib/types/auth.types.ts`

---

### Address Feature
Address hooks, service, types, and address UI components.
**Assigned to: Nkingi**
Files:
- `web/hooks/addresses/useAddresses.ts`
- `web/hooks/addresses/useManageAddress.ts`
- `web/services/address.service.ts`
- `web/lib/types/address.types.ts`
- `web/components/ui/shared/AddressForm.tsx`
- `web/components/ui/shared/AddressPicker.tsx`

---

### Upload Feature
File upload hook, service, types, and image uploader component.
**Assigned to: Nkingi**
Files:
- `web/hooks/uploads/useUpload.ts`
- `web/services/upload.service.ts`
- `web/lib/types/upload.types.ts`
- `web/components/ui/shared/ImageUploader.tsx`

---

## CHRIS

---

### Farmer Layout & Home
Farmer dashboard group layout and home page.
**Assigned to: Chris**
Files:
- `web/app/(farmer)/layout.tsx`
- `web/app/(farmer)/farmer/page.tsx`

---

### Farmer Analytics Dashboard
Dashboard page, farmer dashboard hook, service, types, and stats card component.
**Assigned to: Chris**
Files:
- `web/app/(farmer)/farmer/dashboard/page.tsx`
- `web/hooks/dashboard/useFarmerDashboard.ts`
- `web/services/dashboard.service.ts`
- `web/lib/types/dashboard.types.ts`
- `web/components/ui/shared/DashboardStatCard.tsx`

---

### Product Listings Pages
View listings, create new listing, and edit listing pages.
**Assigned to: Chris**
Files:
- `web/app/(farmer)/farmer/listings/page.tsx`
- `web/app/(farmer)/farmer/listings/new/page.tsx`
- `web/app/(farmer)/farmer/listing/[listingId]/edit/page.tsx`

---

### Product Hooks & Service
Manage, fetch, and autocomplete product hooks plus service and types.
**Assigned to: Chris**
Files:
- `web/hooks/products/useManageProduct.ts`
- `web/hooks/products/useFarmerProducts.ts`
- `web/hooks/products/useProductAutocomplete.ts`
- `web/services/product.service.ts`
- `web/lib/types/product.types.ts`

---

### Farmer Orders
Farmer orders list and order detail pages plus order timeline component.
**Assigned to: Chris**
Files:
- `web/app/(farmer)/farmer/orders/page.tsx`
- `web/app/(farmer)/farmer/orders/[orderId]/page.tsx`
- `web/components/ui/shared/OrderTimeline.tsx`
- `web/components/ui/shared/NegotiationStatusBadge.tsx`

---

### Farmer Profile, Settings & Shared Utilities
Profile and settings pages, shared hooks, and reusable utility components.
**Assigned to: Chris**
Files:
- `web/app/(farmer)/farmer/profile/page.tsx`
- `web/app/(farmer)/farmer/settings/page.tsx`
- `web/hooks/shared/useDebounce.ts`
- `web/hooks/shared/usePagination.ts`
- `web/hooks/shared/useInfiniteScroll.ts`
- `web/components/ui/shared/EmptyState.tsx`
- `web/components/ui/shared/SkeletonCard.tsx`

---

## KAMI

---

### Buyer Layout & Home
Buyer dashboard group layout, home page, and buyer dashboard hook.
**Assigned to: Kami**
Files:
- `web/app/(buyer)/layout.tsx`
- `web/app/(buyer)/buyer/page.tsx`
- `web/hooks/dashboard/useBuyerDashboard.ts`

---

### Marketplace & Product Browsing
Marketplace and search pages, product fetch hooks, and product/search UI components.
**Assigned to: Kami**
Files:
- `web/app/(buyer)/buyer/marketplace/page.tsx`
- `web/app/(buyer)/buyer/search/page.tsx`
- `web/hooks/products/useProducts.ts`
- `web/hooks/products/useProduct.ts`
- `web/hooks/products/useFeaturedProducts.ts`
- `web/components/ui/shared/ProductCard.tsx`
- `web/components/ui/shared/SearchAutocomplete.tsx`
- `web/components/ui/shared/CategoryChip.tsx`

---

### Product Detail & Farmer Discovery
Product detail page, farmer profile page, farmer hooks/service, and farmer card component.
**Assigned to: Kami**
Files:
- `web/app/(buyer)/buyer/product/[productId]/page.tsx`
- `web/app/(buyer)/buyer/farmer/[farmerId]/page.tsx`
- `web/hooks/farmers/useFarmer.ts`
- `web/hooks/farmers/useFeaturedFarmers.ts`
- `web/services/farmer.service.ts`
- `web/components/ui/shared/FarmerCard.tsx`

---

### Buyer Order Management
Orders list, order detail pages, order hooks/service, types, and order card component.
**Assigned to: Kami**
Files:
- `web/app/(buyer)/buyer/orders/page.tsx`
- `web/app/(buyer)/buyer/orders/[orderId]/page.tsx`
- `web/hooks/orders/useOrders.ts`
- `web/hooks/orders/useOrder.ts`
- `web/hooks/orders/useCreateOrder.ts`
- `web/services/order.service.ts`
- `web/lib/types/order.types.ts`
- `web/components/ui/shared/OrderCard.tsx`

---

### Checkout & Payment Flow
Checkout, order confirmation pages, payment hook/service, and payment method component.
**Assigned to: Kami**
Files:
- `web/app/(buyer)/buyer/orders/checkout/[sessionId]/page.tsx`
- `web/app/(buyer)/buyer/order-confirmation/[orderId]/page.tsx`
- `web/hooks/payments/usePayment.ts`
- `web/services/payment.service.ts`
- `web/components/ui/shared/PaymentMethodSelector.tsx`

---

### Buyer Profile & Settings
Buyer profile and settings pages.
**Assigned to: Kami**
Files:
- `web/app/(buyer)/buyer/profile/page.tsx`
- `web/app/(buyer)/buyer/settings/page.tsx`

---

## GHISLAINE

---

### Base UI Primitives
All shadcn/ui base components used across the app.
**Assigned to: Ghislaine**
Files:
- `web/components/ui/avatar.tsx`
- `web/components/ui/badge.tsx`
- `web/components/ui/button.tsx`
- `web/components/ui/card.tsx`
- `web/components/ui/dialog.tsx`
- `web/components/ui/dropdown-menu.tsx`
- `web/components/ui/input.tsx`
- `web/components/ui/select.tsx`
- `web/components/ui/separator.tsx`
- `web/components/ui/slider.tsx`
- `web/components/ui/switch.tsx`
- `web/components/ui/tabs.tsx`
- `web/components/ui/textarea.tsx`

---

### App Shell Components
Header, bottom nav, notification bell, and online status indicator.
**Assigned to: Ghislaine**
Files:
- `web/components/ui/shared/AppHeader.tsx`
- `web/components/ui/shared/BottomNav.tsx`
- `web/components/ui/shared/NotificationBell.tsx`
- `web/components/ui/shared/OnlineStatusDot.tsx`

---

### Chat Feature
Chat pages for farmer and buyer, chat hooks, services, and chat UI components.
**Assigned to: Ghislaine**
Files:
- `web/app/(farmer)/farmer/chats/page.tsx`
- `web/app/(farmer)/farmer/chats/[sessionId]/page.tsx`
- `web/app/(buyer)/buyer/chats/page.tsx`
- `web/app/(buyer)/buyer/chats/chat/[sessionId]/page.tsx`
- `web/hooks/chat/useChat.ts`
- `web/hooks/chat/useChatInbox.ts`
- `web/services/chat.service.ts`
- `web/services/message.service.ts`
- `web/components/ui/shared/ChatMessageBubble.tsx`
- `web/components/ui/shared/VoiceNotePlayer.tsx`
- `web/components/ui/shared/VoiceNoteRecorder.tsx`

---

### Notifications Feature
Notification pages for farmer and buyer, hooks, service, and types.
**Assigned to: Ghislaine**
Files:
- `web/app/(farmer)/farmer/notifications/page.tsx`
- `web/app/(buyer)/buyer/notifications/page.tsx`
- `web/hooks/notifications/useNotifications.ts`
- `web/hooks/notifications/useUnreadCount.ts`
- `web/services/notification.service.ts`
- `web/lib/types/notification.types.ts`

---

### Reviews & Ratings
Review hooks, service, types, review form, and star rating component.
**Assigned to: Ghislaine**
Files:
- `web/hooks/reviews/useFarmerReviews.ts`
- `web/hooks/reviews/useSubmitReview.ts`
- `web/services/review.service.ts`
- `web/lib/types/review.types.ts`
- `web/components/ui/shared/ReviewForm.tsx`
- `web/components/ui/shared/StarRating.tsx`

---

### Negotiations & Proposals
Negotiation and proposal hooks, services, types, and price proposal UI components.
**Assigned to: Ghislaine**
Files:
- `web/hooks/negotiations/useNegotiations.ts`
- `web/hooks/negotiations/useNegotiation.ts`
- `web/hooks/negotiations/useStartNegotiation.ts`
- `web/hooks/proposals/useProposals.ts`
- `web/hooks/proposals/useSendProposal.ts`
- `web/services/negotiation.service.ts`
- `web/services/proposal.service.ts`
- `web/lib/types/negotiation.types.ts`
- `web/components/ui/shared/PriceProposalCard.tsx`
- `web/components/ui/shared/ProposalForm.tsx`
