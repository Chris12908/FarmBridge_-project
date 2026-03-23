'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BottomNav, { BUYER_NAV_ITEMS } from '@/components/ui/shared/BottomNav';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/auth/useAuth';
import { useUnreadCount } from '@/hooks/notifications/useUnreadCount';
import { getInitials } from '@/lib/utils';

const HIDE_SEARCH_PATHS = ['/buyer/chat/', '/buyer/checkout/', '/buyer/order-confirmation/', '/buyer/product/'];

export default function BuyerShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { unreadCount } = useUnreadCount();
  const showSearch = !HIDE_SEARCH_PATHS.some((p) => pathname.includes(p));
  const initials = getInitials(user?.name ?? 'B');

  return (
    <div className="min-h-screen bg-background-light">
      {/* Sticky top header */}
      <header className="sticky top-0 z-40 bg-background-light/95 backdrop-blur-sm border-b border-primary/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link href="/buyer/marketplace" className="flex items-center gap-2 shrink-0">
            <div className="text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-primary hidden sm:block">AgriConnect</span>
          </Link>

          {showSearch && (
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">
                search
              </span>
              <Link href="/buyer/search">
                <Input
                  readOnly
                  placeholder="Search products, farmers..."
                  className="pl-9 bg-neutral-sage border-0 rounded-full text-sm cursor-pointer h-9 focus-visible:ring-primary/30"
                />
              </Link>
            </div>
          )}

          {!showSearch && <div className="flex-1" />}

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/buyer/notifications"
              className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-sage transition-colors"
            >
              <span className="material-symbols-outlined text-slate-600 text-[22px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>
            <Link
              href="/buyer/profile"
              className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-neutral-sage bg-gradient-to-br from-blue-400/30 to-indigo-400/10 flex items-center justify-center"
            >
              {user?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-primary">{initials}</span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Page content with bottom padding for nav */}
      <main className="pb-16">{children}</main>

      <BottomNav items={BUYER_NAV_ITEMS} />
    </div>
  );
}
