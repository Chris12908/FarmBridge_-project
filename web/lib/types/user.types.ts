import type { Role } from './auth.types';

// ─── Farmer Profile ───────────────────────────────────────────────────────────

export interface FarmerProfileData {
  id: string;
  farmName: string;
  farmLocation: string;
  bio?: string;
  latitude?: number;
  longitude?: number;
  crops: string[];
  tags: string[];
  verificationStatus: string;
  rating: number;
  reviewCount: number;
  completedOrderCount: number;
  profileComplete: boolean;
}

// ─── Buyer Profile ────────────────────────────────────────────────────────────

export interface BuyerProfileData {
  id: string;
  preferences: string[];
  location?: string;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  avatarUrl?: string;
  role: Role;
  isVerified: boolean;
  createdAt: string;
  farmerProfile?: FarmerProfileData;
  buyerProfile?: BuyerProfileData;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface UpdateUserDto {
  name?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface UpdateFarmerProfileDto {
  bio?: string;
  farmName?: string;
  farmLocation?: string;
  latitude?: number;
  longitude?: number;
  crops?: string[];
  tags?: string[];
}
