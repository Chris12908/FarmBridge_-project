import type { Order } from './order.types';
import type { AppNotification } from './notification.types';

// ─── Farmer Dashboard ─────────────────────────────────────────────────────────

export interface MonthlyRevenue {
  month: string;
  amount: number;
}

export interface FarmerDashboard {
  totalEarnings: number;
  activeListings: number;
  pendingOrders: number;
  completedOrders: number;
  averageRating: number;
  reviewCount: number;
  recentOrders: Order[];
  monthlyRevenue: MonthlyRevenue[];
}

// ─── Buyer Dashboard ──────────────────────────────────────────────────────────

export interface BuyerDashboard {
  totalSpend: number;
  activeNegotiations: number;
  ordersInProgress: number;
  completedOrders: number;
  recentActivity: AppNotification[];
}
