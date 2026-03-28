'use client';

import { useOrders } from '@/hooks/orders/useOrders';
import { OrderStatus } from '@/lib/types/order.types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderCard from '@/components/ui/shared/OrderCard';
import EmptyState from '@/components/ui/shared/EmptyState';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';

const STATUS_TABS: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: OrderStatus.PENDING, label: 'Pending' },
  { value: OrderStatus.CONFIRMED, label: 'Confirmed' },
  { value: OrderStatus.DISPATCHED, label: 'Dispatched' },
  { value: OrderStatus.DELIVERED, label: 'Delivered' },
];

export default function FarmerOrdersPage() {
  const { orders, isLoading, error } = useOrders();

  return (
    <div className="px-4 py-5 max-w-2xl lg:max-w-4xl mx-auto">
      <h1 className="text-xl font-black text-slate-800 mb-5">Order Management</h1>

      <Tabs defaultValue="all">
        <TabsList className="bg-neutral-sage/50 rounded-xl p-1 w-full mb-5 flex overflow-x-auto">
          {STATUS_TABS.map((tab) => {
            const count = tab.value === 'all' ? orders.length : orders.filter((o) => o.status === tab.value).length;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="shrink-0 rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary px-3"
              >
                {tab.label}
                {count > 0 && <span className="ml-1 text-text-muted">({count})</span>}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="all">
          {isLoading ? (
            <div className="flex flex-col gap-4"><SkeletonCard variant="order" count={4} /></div>
          ) : error ? (
            <EmptyState icon="error" title="Could not load orders" description="Please check your connection and try again." />
          ) : orders.length === 0 ? (
            <EmptyState icon="receipt_long" title="No orders yet" description="Orders from buyers will appear here." />
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => <OrderCard key={order.id} order={order} variant="farmer" />)}
            </div>
          )}
        </TabsContent>

        {STATUS_TABS.filter((t) => t.value !== 'all').map((tab) => {
          const filtered = orders.filter((o) => o.status === tab.value);
          return (
            <TabsContent key={tab.value} value={tab.value}>
              {isLoading ? (
                <div className="flex flex-col gap-4"><SkeletonCard variant="order" count={3} /></div>
              ) : error ? (
                <EmptyState icon="error" title="Could not load orders" description="Please check your connection and try again." />
              ) : filtered.length === 0 ? (
                <EmptyState icon="receipt_long" title={`No ${tab.label.toLowerCase()} orders`} />
              ) : (
                <div className="flex flex-col gap-4">
                  {filtered.map((order) => <OrderCard key={order.id} order={order} variant="farmer" />)}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
