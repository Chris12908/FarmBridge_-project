import Link from 'next/link';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Order } from '@/lib/types/order.types';
import { OrderStatusBadge } from './NegotiationStatusBadge';

interface OrderCardProps {
  order: Order;
  variant?: 'farmer' | 'buyer';
}

export default function OrderCard({ order, variant = 'farmer' }: OrderCardProps) {
  const isFarmer = variant === 'farmer';
  const linkHref = isFarmer
    ? `/farmer/orders/${order.id}`
    : `/buyer/orders/${order.id}`;

  const productName = order.session?.product?.name;
  const counterpartyName = isFarmer ? order.buyer?.name : order.farmer?.name;

  return (
    <div className="bg-white rounded-xl border border-primary/10 shadow-sm p-4 hover:shadow-md hover:border-primary/20 transition-all">
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1 min-w-0 pr-2">
          {productName ? (
            <p className="text-sm font-semibold text-slate-800 truncate">{productName}</p>
          ) : (
            <p className="text-sm font-semibold text-slate-800">{order.orderNumber}</p>
          )}
          {counterpartyName && (
            <p className="text-xs text-text-muted mt-0.5">
              {isFarmer ? 'Buyer' : 'From'}: {counterpartyName}
            </p>
          )}
          {productName && (
            <p className="text-xs font-mono text-text-muted mt-0.5">{order.orderNumber}</p>
          )}
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3 mt-3">
        <div>
          <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Qty</p>
          <p className="text-xs font-semibold text-slate-700">{order.quantity} units</p>
        </div>
        <div>
          <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Date</p>
          <p className="text-xs font-semibold text-slate-700">{formatDate(order.createdAt)}</p>
        </div>
        <div>
          <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Total</p>
          <p className="text-xs font-bold text-primary">{formatCurrency(order.totalAmount)}</p>
        </div>
        <div>
          <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Payment</p>
          <p className="text-xs font-semibold text-slate-700">{order.paymentStatus}</p>
        </div>
      </div>

      <Link
        href={linkHref}
        className="flex items-center justify-end gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        View Details
        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
      </Link>
    </div>
  );
}
