'use client';

import Link from 'next/link';
import BottomNav, { FARMER_NAV_ITEMS } from '@/components/ui/shared/BottomNav';
import { useAuth } from '@/hooks/auth/useAuth';
import { useUnreadCount } from '@/hooks/notifications/useUnreadCount';
import { getInitials } from '@/lib/utils';

export default function FarmerShellLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { unreadCount } = useUnreadCount();
  const initials = getInitials(user?.name ?? 'F');

  return (
    <div className="min-h-screen bg-background-light">
      {/* Sticky top header */}
      <header className="sticky top-0 z-40 bg-background-light/95 backdrop-blur-sm border-b border-primary/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link href="/farmer/dashboard" className="flex items-center gap-2">
            <div className="text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-primary">AgriConnect</span>
          </Link>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Link
              href="/farmer/notifications"
              className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-sage transition-colors"
            >
              <span className="material-symbols-outlined text-slate-600 text-[22px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>
            <Link href="/farmer/profile" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-neutral-sage bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                {user?.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-primary">{initials}</span>
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-slate-800 leading-none">{user?.name ?? 'Farmer'}</p>
                <p className="text-[10px] text-text-muted leading-none mt-0.5">
                  {user?.farmerProfile?.farmName ?? 'Farmer'}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Page content with bottom padding for nav */}
      <main className="pb-16">{children}</main>

      <BottomNav items={FARMER_NAV_ITEMS} />
    </div>
  );
}
