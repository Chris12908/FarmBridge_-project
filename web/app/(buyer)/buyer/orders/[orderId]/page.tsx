'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useOrder } from '@/hooks/orders/useOrder';
import { formatCurrency, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/lib/types/order.types';
import AppHeader from '@/components/ui/shared/AppHeader';
import { OrderTimeline } from '@/components/ui/shared/OrderTimeline';

const STATUS_COLORS: Record<string, string> = {
  [OrderStatus.PENDING]: 'bg-accent-amber/10 text-accent-amber',
  [OrderStatus.CONFIRMED]: 'bg-blue-50 text-blue-600',
  [OrderStatus.DISPATCHED]: 'bg-purple-50 text-purple-600',
  [OrderStatus.DELIVERED]: 'bg-primary/10 text-primary',
  [OrderStatus.CANCELLED]: 'bg-red-50 text-red-500',
  [OrderStatus.REFUNDED]: 'bg-slate-100 text-slate-600',
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const { order, isLoading } = useOrder(orderId);

  if (isLoading) {
    return (
      <div>
        <AppHeader backHref="/buyer/orders" title="Order Details" />
        <div className="px-4 py-5 max-w-lg mx-auto animate-pulse space-y-4">
          <div className="h-24 bg-slate-200 rounded-2xl" />
          <div className="h-48 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        <AppHeader backHref="/buyer/orders" title="Order Details" />
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-text-muted">Order not found.</p>
          <Link href="/buyer/orders" className="text-primary text-sm font-semibold mt-2">View all orders</Link>
        </div>
      </div>
    );
  }

  const statusColor = STATUS_COLORS[order.status] ?? 'bg-slate-100 text-slate-600';

  return (
    <div>
      <AppHeader backHref="/buyer/orders" title="Order Details" />
      <div className="px-4 py-5 max-w-lg mx-auto space-y-4">

        {/* Order header */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-text-muted">Order Reference</p>
              <p className="font-black text-slate-800 text-lg">#{order.orderNumber}</p>
              <p className="text-xs text-text-muted mt-0.5">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColor}`}>
              {order.status.toLowerCase()}
            </span>
          </div>

          {/* Financials */}
          <div className="space-y-2 text-sm border-t border-primary/5 pt-4">
            <div className="flex justify-between">
              <span className="text-text-muted">Quantity</span>
              <span className="font-semibold">{order.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Unit price</span>
              <span className="font-semibold">{formatCurrency(order.pricePerUnit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Subtotal</span>
              <span className="font-semibold">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Platform fee</span>
              <span className="font-semibold">{formatCurrency(order.platformFee)}</span>
            </div>
            <div className="flex justify-between border-t border-primary/5 pt-2 font-bold text-slate-800">
              <span>Total</span>
              <span className="text-primary text-base">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-4">Order Progress</h3>
          <OrderTimeline
            status={order.status}
            confirmedAt={order.confirmedAt}
            dispatchedAt={order.dispatchedAt}
            deliveredAt={order.deliveredAt}
            cancelledAt={order.cancelledAt}
          />
        </div>

        {/* Delivery address */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-3">Delivery Address</h3>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">location_on</span>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{order.deliveryAddressSnapshot.label}</p>
              <p className="text-xs text-text-muted">
                {order.deliveryAddressSnapshot.street}, {order.deliveryAddressSnapshot.city}
              </p>
              <p className="text-xs text-text-muted">
                {order.deliveryAddressSnapshot.state}, {order.deliveryAddressSnapshot.country}
              </p>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-3">Payment</h3>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Method</span>
            <span className="font-semibold capitalize">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-text-muted">Status</span>
            <span className={`font-semibold capitalize ${order.paymentStatus === 'PAID' ? 'text-primary' : 'text-accent-amber'}`}>
              {order.paymentStatus.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
