'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useOrder } from '@/hooks/orders/useOrder';
import { orderService } from '@/services/order.service';
import { QUERY_KEYS } from '@/lib/constants';
import { formatCurrency, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/lib/types/order.types';
import { Button, buttonVariants } from '@/components/ui/button';
import AppHeader from '@/components/ui/shared/AppHeader';
import { OrderTimeline } from '@/components/ui/shared/OrderTimeline';
import { OrderStatusBadge } from '@/components/ui/shared/NegotiationStatusBadge';
import { toast } from 'sonner';

export default function BuyerOrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const queryClient = useQueryClient();
  const { order, isLoading } = useOrder(orderId);

  const confirmDeliveryMutation = useMutation({
    mutationFn: () => orderService.confirmDelivery(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.all });
      toast.success('Delivery confirmed! Thank you.');
    },
    onError: (err: unknown) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.detail(orderId) });
      toast.error((err as { message?: string })?.message ?? 'Failed to confirm delivery');
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => orderService.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.all });
      toast.success('Order cancelled.');
    },
    onError: (err: unknown) => {
      toast.error((err as { message?: string })?.message ?? 'Failed to cancel order');
    },
  });

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
        </div>
      </div>
    );
  }

  const productName = order.session?.product?.name;
  const farmerName = order.farmer?.name;

  return (
    <div>
      <AppHeader backHref="/buyer/orders" title="Order Details" />
      <div className="px-4 py-5 max-w-lg mx-auto space-y-4">

        {/* Order header */}
        <div className="flex items-start justify-between">
          <div>
            {productName && (
              <p className="text-sm font-bold text-slate-800">{productName}</p>
            )}
            {farmerName && (
              <p className="text-xs text-text-muted mt-0.5">From: {farmerName}</p>
            )}
            <p className="text-xs font-mono text-text-muted mt-0.5">{order.orderNumber}</p>
            <p className="text-xs text-text-muted mt-0.5">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Financials */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="text-sm font-bold text-slate-800 mb-3">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Quantity</span>
              <span className="font-semibold">{order.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Unit price</span>
              <span className="font-semibold">{formatCurrency(order.pricePerUnit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Platform fee (5%)</span>
              <span className="font-semibold">{formatCurrency(order.platformFee)}</span>
            </div>
            <div className="flex justify-between border-t border-primary/5 pt-2 font-bold">
              <span>Total paid</span>
              <span className="text-primary text-base">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="text-sm font-bold text-slate-800 mb-3">Delivery Address</h2>
          {order.deliveryAddressSnapshot?.street ? (
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">location_on</span>
              <div>
                {order.deliveryAddressSnapshot.label && (
                  <p className="font-semibold text-slate-800 text-sm">{order.deliveryAddressSnapshot.label}</p>
                )}
                <p className="text-xs text-text-muted">
                  {order.deliveryAddressSnapshot.street}, {order.deliveryAddressSnapshot.city}
                </p>
                <p className="text-xs text-text-muted">
                  {order.deliveryAddressSnapshot.state}, {order.deliveryAddressSnapshot.country}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-text-muted">No delivery address provided.</p>
          )}
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="text-sm font-bold text-slate-800 mb-4">Progress</h2>
          <OrderTimeline
            status={order.status}
            confirmedAt={order.confirmedAt}
            dispatchedAt={order.dispatchedAt}
            deliveredAt={order.deliveredAt}
            cancelledAt={order.cancelledAt}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {order.status === OrderStatus.DISPATCHED && (
            <Button
              className="flex-1 h-11 rounded-xl font-bold"
              onClick={() => confirmDeliveryMutation.mutate()}
              disabled={confirmDeliveryMutation.isPending}
            >
              <span className="material-symbols-outlined text-[18px] mr-2">check_circle</span>
              {confirmDeliveryMutation.isPending ? 'Confirming...' : 'Confirm Delivery'}
            </Button>
          )}
          {order.status === OrderStatus.PENDING && (
            <Button
              variant="destructive"
              className="flex-1 h-11 rounded-xl font-bold"
              onClick={() => cancelMutation.mutate()}
              disabled={cancelMutation.isPending}
            >
              <span className="material-symbols-outlined text-[18px] mr-2">cancel</span>
              {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Order'}
            </Button>
          )}
          <Link
            href="/buyer/orders"
            className={buttonVariants({ variant: 'outline' }) + ' flex-1 h-11 rounded-xl justify-center'}
          >
            Back to Orders
          </Link>
        </div>

        {order.status === OrderStatus.DISPATCHED && (
          <p className="text-center text-xs text-text-muted px-2">
            Received your order? Tap &quot;Confirm Delivery&quot; to let the farmer know it arrived.
          </p>
        )}
      </div>
    </div>
  );
}
