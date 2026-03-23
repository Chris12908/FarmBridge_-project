import { cn } from '@/lib/utils';
import { NegotiationStatus } from '@/lib/types/negotiation.types';
import { OrderStatus } from '@/lib/types/order.types';

const NEGOTIATION_CONFIG: Record<NegotiationStatus, { label: string; className: string }> = {
  [NegotiationStatus.INITIATED]: { label: 'New', className: 'bg-slate-100 text-slate-600' },
  [NegotiationStatus.NEGOTIATING]: { label: 'Negotiating', className: 'bg-blue-50 text-blue-700' },
  [NegotiationStatus.PRICE_PROPOSED]: { label: 'Offer Pending', className: 'bg-accent-amber/10 text-accent-amber' },
  [NegotiationStatus.BUYER_APPROVED]: { label: 'Deal Agreed', className: 'bg-primary/10 text-primary' },
  [NegotiationStatus.BUYER_DECLINED]: { label: 'Declined', className: 'bg-red-50 text-red-600' },
  [NegotiationStatus.CHECKED_OUT]: { label: 'Checked Out', className: 'bg-purple-50 text-purple-700' },
  [NegotiationStatus.FULFILLED]: { label: 'Fulfilled', className: 'bg-primary/10 text-primary' },
};

const ORDER_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  [OrderStatus.PENDING]: { label: 'Pending', className: 'bg-accent-amber/10 text-accent-amber' },
  [OrderStatus.CONFIRMED]: { label: 'Confirmed', className: 'bg-blue-50 text-blue-700' },
  [OrderStatus.DISPATCHED]: { label: 'Dispatched', className: 'bg-purple-50 text-purple-700' },
  [OrderStatus.DELIVERED]: { label: 'Delivered', className: 'bg-primary/10 text-primary' },
  [OrderStatus.CANCELLED]: { label: 'Cancelled', className: 'bg-red-50 text-red-600' },
  [OrderStatus.REFUNDED]: { label: 'Refunded', className: 'bg-slate-100 text-slate-500' },
};

interface NegotiationStatusBadgeProps {
  status: NegotiationStatus | string;
}

interface OrderStatusBadgeProps {
  status: OrderStatus | string;
}

export function NegotiationStatusBadge({ status }: NegotiationStatusBadgeProps) {
  const config = NEGOTIATION_CONFIG[status as NegotiationStatus];
  if (!config) return null;
  return (
    <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', config.className)}>
      {config.label}
    </span>
  );
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = ORDER_CONFIG[status as OrderStatus];
  if (!config) return null;
  return (
    <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', config.className)}>
      {config.label}
    </span>
  );
}
