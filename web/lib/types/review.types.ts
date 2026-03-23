import type { UserProfile } from './user.types';

// ─── Review ───────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  farmerId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer?: UserProfile;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface CreateReviewDto {
  orderId: string;
  rating: number;
  comment?: string;
}
