'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BottomNavItem {
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

interface BottomNavProps {
  items: BottomNavItem[];
}

export const BUYER_NAV_ITEMS: BottomNavItem[] = [
  { label: 'Market', icon: 'storefront', href: '/buyer/marketplace' },
  { label: 'Search', icon: 'search', href: '/buyer/search' },
  { label: 'Chats', icon: 'chat', href: '/buyer/chats', badge: 2 },
  { label: 'Orders', icon: 'receipt_long', href: '/buyer/orders' },
  { label: 'Profile', icon: 'person', href: '/buyer/profile' },
];

export const FARMER_NAV_ITEMS: BottomNavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', href: '/farmer/dashboard' },
  { label: 'Listings', icon: 'inventory_2', href: '/farmer/listings' },
  { label: 'Chats', icon: 'chat', href: '/farmer/chats', badge: 3 },
  { label: 'Orders', icon: 'local_shipping', href: '/farmer/orders' },
  { label: 'Profile', icon: 'person', href: '/farmer/profile' },
];

export default function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light border-t border-primary/10">
      <div className="flex items-stretch h-16">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors',
                isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
              )}
            >
              <div className="relative">
                <span
                  className={cn(
                    'material-symbols-outlined text-[22px]',
                    isActive && 'fill-1'
                  )}
                >
                  {item.icon}
                </span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium tracking-tight',
                  isActive ? 'text-primary' : 'text-slate-400'
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
