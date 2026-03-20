'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFarmerDashboard } from '@/hooks/dashboard/useFarmerDashboard';
import { useAuth } from '@/hooks/auth/useAuth';
import { useChatInbox } from '@/hooks/chat/useChatInbox';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import { NegotiationStatus } from '@/lib/types';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';
import { routes } from '@/lib/routes';

export default function FarmerDashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { dashboard, isLoading } = useFarmerDashboard();
  const { sessions } = useChatInbox();

  // Safety guard: farmers who skipped or never completed Step 2 of signup
  // cannot access the dashboard — redirect them to finish their profile first.
  useEffect(() => {
    if (authLoading) return;
    if (user?.farmerProfile?.profileComplete === false) {
      router.replace(routes.auth.farmerProfile());
    }
  }, [authLoading, user, router]);

  const pendingSessions = sessions.filter((s) =>
    [NegotiationStatus.PRICE_PROPOSED, NegotiationStatus.NEGOTIATING, NegotiationStatus.INITIATED].includes(s.status)
  ).length;

  const farmerProfile = user?.farmerProfile;
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="px-4 py-5 max-w-2xl lg:max-w-5xl mx-auto">
      {/* Greeting */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-text-muted text-sm">Good morning,</p>
          <h1 className="text-2xl font-black text-slate-800">{firstName} 👋</h1>
          {farmerProfile && (
            <p className="text-xs text-text-muted mt-0.5">{farmerProfile.farmName} · {farmerProfile.farmLocation}</p>
          )}
        </div>
        <Link href="/farmer/listings/new" className={cn(buttonVariants(), 'rounded-xl h-9 text-sm font-bold gap-1')}>
          <span className="material-symbols-outlined text-[16px]">add</span>
          New Listing
        </Link>
      </div>

      {/* Stats */}
      {isLoading ? (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <SkeletonCard variant="stat" count={3} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
            <p className="text-2xl font-black text-primary">{dashboard?.activeListings ?? 0}</p>
            <p className="text-xs text-text-muted mt-0.5">Active Listings</p>
          </div>
          <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
            <p className="text-2xl font-black text-accent-amber">{pendingSessions}</p>
            <p className="text-xs text-text-muted mt-0.5">Negotiations</p>
            {pendingSessions > 0 && (
              <span className="text-[10px] font-semibold bg-red-50 text-red-500 px-1.5 py-0.5 rounded-full inline-block mt-2">
                Urgent
              </span>
            )}
          </div>
          <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
            <p className="text-2xl font-black text-primary">{dashboard?.completedOrders ?? 0}</p>
            <p className="text-xs text-text-muted mt-0.5">Orders Done</p>
          </div>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        {/* Recent Orders */}
        <div>
          <h2 className="font-bold text-slate-800 mb-4 text-sm">Recent Orders</h2>
          {isLoading ? (
            <div className="space-y-3"><SkeletonCard variant="order" count={3} /></div>
          ) : !dashboard?.recentOrders?.length ? (
            <div className="bg-white rounded-2xl border border-primary/10 p-6 text-center">
              <span className="material-symbols-outlined text-primary/30 text-4xl block mb-2">receipt_long</span>
              <p className="text-sm text-text-muted">No recent orders</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
              {dashboard.recentOrders.slice(0, 4).map((order, idx) => (
                <div key={order.id}>
                  <Link href={`/farmer/orders/${order.id}`}>
                    <div className="flex items-center gap-3 p-4 hover:bg-neutral-sage/30 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-[16px]">receipt</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800">#{order.orderNumber}</p>
                        <p className="text-xs text-text-muted capitalize">{order.status.toLowerCase()}</p>
                      </div>
                      <p className="text-sm font-black text-primary">{formatCurrency(order.totalAmount)}</p>
                    </div>
                  </Link>
                  {idx < Math.min(3, dashboard.recentOrders.length - 1) && <Separator className="mx-4" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick links & revenue */}
        <div className="mt-6 lg:mt-0">
          <h2 className="font-bold text-slate-800 mb-4 text-sm">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: 'inventory_2', label: 'My Listings', href: '/farmer/listings', color: 'bg-primary/5 text-primary' },
              { icon: 'chat', label: 'Negotiations', href: '/farmer/chats', color: 'bg-blue-50 text-blue-600', badge: pendingSessions },
              { icon: 'local_shipping', label: 'Orders', href: '/farmer/orders', color: 'bg-purple-50 text-purple-600', badge: dashboard?.pendingOrders },
              { icon: 'add_circle', label: 'New Listing', href: '/farmer/listings/new', color: 'bg-accent-amber/10 text-accent-amber' },
            ].map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4 hover:shadow-md hover:border-primary/20 transition-all flex flex-col gap-2 relative">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
                    <span className="material-symbols-outlined text-[20px]">{action.icon}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{action.label}</p>
                  {action.badge ? (
                    <span className="absolute top-3 right-3 min-w-[20px] h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                      {action.badge}
                    </span>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>

          {/* Revenue summary */}
          <div className="mt-4 bg-primary rounded-2xl p-4 text-white">
            <p className="text-xs text-white/70 mb-1">Total Earnings</p>
            <p className="text-3xl font-black">{formatCurrency(dashboard?.totalEarnings ?? 0)}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-[14px] text-white/70">receipt_long</span>
              <span className="text-xs text-white/70">{dashboard?.completedOrders ?? 0} orders completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
