'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';
import { useBuyerDashboard } from '@/hooks/dashboard/useBuyerDashboard';
import { useOrders } from '@/hooks/orders/useOrders';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import { routes } from '@/lib/routes';
import AppHeader from '@/components/ui/shared/AppHeader';
import { buttonVariants } from '@/components/ui/button';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';

export default function BuyerDashboardPage() {
  const { user } = useAuth();
  const { dashboard, isLoading } = useBuyerDashboard();
  const { orders, isLoading: ordersLoading } = useOrders({ limit: 5 });

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background-light pb-24">
      <AppHeader title="Dashboard" />

      <div className="px-4 py-5 max-w-2xl mx-auto space-y-5">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            {greeting()}, {user?.name?.split(' ')[0] ?? 'there'}!
          </h1>
          <p className="text-sm text-text-muted mt-1">Here&apos;s your activity overview.</p>
        </div>

        {/* Stat cards */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
              <p className="text-xs text-text-muted font-medium mb-1">Total Spent</p>
              <p className="text-xl font-black text-primary">{formatCurrency(dashboard?.totalSpend ?? 0)}</p>
            </div>
            <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
              <p className="text-xs text-text-muted font-medium mb-1">Active Negotiations</p>
              <p className="text-xl font-black text-primary">{dashboard?.activeNegotiations ?? 0}</p>
            </div>
            <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
              <p className="text-xs text-text-muted font-medium mb-1">Orders In Progress</p>
              <p className="text-xl font-black text-primary">{dashboard?.ordersInProgress ?? 0}</p>
            </div>
            <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4">
              <p className="text-xs text-text-muted font-medium mb-1">Completed Orders</p>
              <p className="text-xl font-black text-primary">{dashboard?.completedOrders ?? 0}</p>
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Recent Orders</h2>
            <Link href={routes.buyer.orders()} className="text-xs font-semibold text-primary hover:text-primary/80">
              View all
            </Link>
          </div>

          {ordersLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-4xl text-slate-300 block mb-2">shopping_bag</span>
              <p className="text-sm text-text-muted">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={routes.buyer.order(order.id)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-primary/10 hover:bg-primary/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[18px]">local_shipping</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      Order #{order.orderNumber}
                    </p>
                    <p className="text-xs text-text-muted">{formatRelativeTime(order.createdAt)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-primary">{formatCurrency(order.totalAmount)}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      order.status === 'DELIVERED'
                        ? 'bg-green-50 text-green-600'
                        : order.status === 'CANCELLED'
                        ? 'bg-red-50 text-red-500'
                        : 'bg-accent-amber/10 text-accent-amber'
                    }`}>
                      {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {dashboard?.recentActivity && dashboard.recentActivity.length > 0 && (
          <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
            <h2 className="font-bold text-slate-800 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {dashboard.recentActivity.slice(0, 5).map((notif) => (
                <div key={notif.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-primary text-[14px]">notifications</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{notif.title}</p>
                    {notif.body && <p className="text-xs text-text-muted mt-0.5">{notif.body}</p>}
                    <p className="text-[10px] text-text-muted mt-1">{formatRelativeTime(notif.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Browse marketplace CTA */}
        <Link
          href={routes.buyer.marketplace()}
          className={buttonVariants() + ' w-full h-12 rounded-xl text-base justify-center font-bold'}
        >
          <span className="material-symbols-outlined text-[18px] mr-2">storefront</span>
          Browse Marketplace
        </Link>
      </div>
    </div>
  );
}
