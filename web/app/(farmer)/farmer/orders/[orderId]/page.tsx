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

export default function FarmerOrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const queryClient = useQueryClient();
  const { order, isLoading } = useOrder(orderId);

  const updateStatusMutation = useMutation({
    mutationFn: (status: OrderStatus) => orderService.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.all });
      toast.success('Order status updated!');
    },
    onError: (err: unknown) => {
      // Refetch so the UI always reflects the true current state in the DB,
      // preventing stale-data 400 loops (e.g. order auto-confirmed by payment webhook).
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.detail(orderId) });
      toast.error((err as { message?: string })?.message ?? 'Failed to update order status');
    },
  });

  if (isLoading) {
    return (
      <div>
        <AppHeader backHref="/farmer/orders" title="Order Details" />
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
        <AppHeader backHref="/farmer/orders" title="Order Details" />
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-text-muted">Order not found.</p>
        </div>
      </div>
    );
  }

  const productName = order.session?.product?.name;
  const buyerName = order.buyer?.name;

  return (
    <div>
      <AppHeader backHref="/farmer/orders" title="Order Details" />
      <div className="px-4 py-5 max-w-lg mx-auto space-y-4">

        {/* Order header */}
        <div className="flex items-start justify-between">
          <div>
            {productName && (
              <p className="text-sm font-bold text-slate-800">{productName}</p>
            )}
            {buyerName && (
              <p className="text-xs text-text-muted mt-0.5">Buyer: {buyerName}</p>
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
            <div className="flex justify-between border-t border-primary/5 pt-2 font-bold">
              <span>Total</span>
              <span className="text-primary text-base">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="text-sm font-bold text-slate-800 mb-3">Delivery</h2>
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
          {order.status === OrderStatus.PENDING && (
            <Button
              className="flex-1 h-11 rounded-xl font-bold"
              onClick={() => updateStatusMutation.mutate(OrderStatus.CONFIRMED)}
              disabled={updateStatusMutation.isPending}
            >
              <span className="material-symbols-outlined text-[18px] mr-2">check_circle</span>
              {updateStatusMutation.isPending ? 'Confirming...' : 'Confirm Order'}
            </Button>
          )}
          {order.status === OrderStatus.CONFIRMED && (
            <Button
              className="flex-1 h-11 rounded-xl font-bold"
              onClick={() => updateStatusMutation.mutate(OrderStatus.DISPATCHED)}
              disabled={updateStatusMutation.isPending}
            >
              <span className="material-symbols-outlined text-[18px] mr-2">local_shipping</span>
              {updateStatusMutation.isPending ? 'Updating...' : 'Mark as Dispatched'}
            </Button>
          )}
          {order.status === OrderStatus.DISPATCHED && (
            <Button
              className="flex-1 h-11 rounded-xl font-bold"
              onClick={() => updateStatusMutation.mutate(OrderStatus.DELIVERED)}
              disabled={updateStatusMutation.isPending}
            >
              <span className="material-symbols-outlined text-[18px] mr-2">inventory</span>
              {updateStatusMutation.isPending ? 'Updating...' : 'Mark as Delivered'}
            </Button>
          )}
          <Link
            href="/farmer/orders"
            className={buttonVariants({ variant: 'outline' }) + ' flex-1 h-11 rounded-xl justify-center'}
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
