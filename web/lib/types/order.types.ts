// ─── Enums ────────────────────────────────────────────────────────────────────

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DISPATCHED = 'DISPATCHED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export type PaymentMethod = 'STRIPE' | 'FLUTTERWAVE_MPESA' | 'FLUTTERWAVE_MTN' | 'FLUTTERWAVE_ORANGE';

// ─── Address Snapshot ─────────────────────────────────────────────────────────

export interface DeliveryAddressSnapshot {
  label?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

// ─── Order ────────────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  orderNumber: string;
  sessionId: string;
  buyerId: string;
  farmerId: string;
  addressId?: string;
  deliveryAddressSnapshot: DeliveryAddressSnapshot;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
  platformFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  stripePaymentIntentId?: string;
  flutterwaveTxRef?: string;
  confirmedAt?: string;
  dispatchedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  // Relations returned by the API
  session?: {
    product?: { id: string; name: string; images: string[] };
  };
  buyer?: { id: string; name: string; avatarUrl?: string };
  farmer?: { id: string; name: string; avatarUrl?: string };
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface CreateOrderDto {
  sessionId: string;
  addressId: string;
  paymentMethod: PaymentMethod;
  proposalId?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
}

export interface OrderQueryParams {
  status?: OrderStatus;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}
