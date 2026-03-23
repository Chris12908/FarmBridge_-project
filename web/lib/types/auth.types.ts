import type { UserProfile } from './user.types';

// ─── Role ─────────────────────────────────────────────────────────────────────

export enum Role {
  BUYER = 'BUYER',
  FARMER = 'FARMER',
  ADMIN = 'ADMIN',
}

// ─── Token Pair ───────────────────────────────────────────────────────────────

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

// ─── Auth Response ────────────────────────────────────────────────────────────

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface RegisterBuyerDto {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface RegisterFarmerDto {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  farmName: string;
  farmLocation: string;
}

export interface CompleteFarmerProfileDto {
  bio?: string;
  farmLocation: string;
  latitude?: number;
  longitude?: number;
  crops: string[];
  tags: string[];
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}
