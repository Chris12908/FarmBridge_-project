'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useOrder } from '@/hooks/orders/useOrder';
import { formatCurrency, formatDate } from '@/lib/utils';
import { OrderStatus, PaymentStatus } from '@/lib/types/order.types';
import { Button, buttonVariants } from '@/components/ui/button';
import { OrderTimeline } from '@/components/ui/shared/OrderTimeline';

export default function OrderConfirmationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params.orderId as string;
  const { order, isLoading } = useOrder(orderId);

  // Stripe redirects back with payment_intent_status
  const paymentIntentStatus = searchParams.get('payment_intent_status');
  const paymentFailed = paymentIntentStatus === 'requires_payment_method';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light px-4 py-8 max-w-lg mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-20 w-20 bg-slate-200 rounded-full mx-auto" />
          <div className="h-8 bg-slate-200 rounded w-1/2 mx-auto" />
          <div className="h-48 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-text-muted">Order not found.</p>
        <Link href="/buyer/orders" className="text-primary text-sm font-semibold mt-2">View all orders</Link>
      </div>
    );
  }

  const isPaid = order.paymentStatus === PaymentStatus.PAID || paymentIntentStatus === 'succeeded';

  if (paymentFailed) {
    return (
      <div className="min-h-screen bg-background-light px-4 py-8 max-w-lg mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-red-500 text-5xl">error</span>
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-2">Payment Failed</h1>
        <p className="text-text-muted text-sm mb-6">
          Your payment could not be processed. Please try again.
        </p>
        <Link
          href={`/buyer/checkout/${order.sessionId}`}
          className={buttonVariants() + ' w-full h-12 rounded-xl text-base justify-center'}
        >
          Try Again
        </Link>
        <Link href="/buyer/marketplace" className="text-sm text-text-muted mt-4 hover:text-primary">
          Back to marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light px-4 py-8 max-w-lg mx-auto">
      {/* Success hero */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isPaid ? 'bg-primary/10' : 'bg-accent-amber/10'}`}>
          <span className={`material-symbols-outlined text-5xl ${isPaid ? 'text-primary' : 'text-accent-amber'}`}>
            {isPaid ? 'check_circle' : 'pending'}
          </span>
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-1">
          {isPaid ? 'Payment Confirmed!' : 'Order Placed!'}
        </h1>
        <p className="text-text-muted text-sm">
          {isPaid
            ? `Order #${order.orderNumber} is being processed`
            : `Order #${order.orderNumber} — awaiting payment`}
        </p>
      </div>

      {/* Order summary */}
      <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-text-muted">Order Reference</p>
            <p className="font-bold text-slate-800">#{order.orderNumber}</p>
          </div>
          <span className="text-xs font-semibold bg-accent-amber/10 text-accent-amber px-2.5 py-1 rounded-full capitalize">
            {order.status.toLowerCase()}
          </span>
        </div>

        <div className="space-y-2 text-sm pb-4 border-b border-primary/5">
          <div className="flex justify-between">
            <span className="text-text-muted">Quantity</span>
            <span className="font-semibold">{order.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Unit price</span>
            <span className="font-semibold">{formatCurrency(order.pricePerUnit)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Platform fee</span>
            <span className="font-semibold">{formatCurrency(order.platformFee)}</span>
          </div>
          <div className="flex justify-between border-t border-primary/5 pt-2">
            <span className="font-bold text-slate-800">Total paid</span>
            <span className="font-black text-primary text-lg">{formatCurrency(order.totalAmount)}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              Deliver to
            </span>
            <span className="font-semibold text-slate-700 text-right max-w-[200px]">
              {order.deliveryAddressSnapshot.label} · {order.deliveryAddressSnapshot.city}
            </span>
          </div>
        </div>
      </div>

      {/* Order timeline */}
      <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5 mb-4">
        <h3 className="font-bold text-slate-800 mb-4">Order Progress</h3>
        <OrderTimeline
          status={order.status}
          confirmedAt={order.confirmedAt}
          dispatchedAt={order.dispatchedAt}
          deliveredAt={order.deliveredAt}
          cancelledAt={order.cancelledAt}
        />
      </div>

      {/* Actions */}
      <div className="space-y-3 mb-6">
        <Link href={`/buyer/order/${order.id}`} className={buttonVariants() + ' w-full h-12 rounded-xl text-base justify-center'}>
          <span className="material-symbols-outlined text-[18px] mr-2">local_shipping</span>
          Track Order
        </Link>
        <Link href="/buyer/marketplace" className={buttonVariants({ variant: 'outline' }) + ' w-full h-12 rounded-xl text-base justify-center'}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
