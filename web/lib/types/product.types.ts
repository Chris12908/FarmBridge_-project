import type { FarmerProfileData } from './user.types';

export interface ProductFarmer {
  id: string;
  name: string;
  avatarUrl?: string;
  farmerProfile?: FarmerProfileData;
}

// ─── Enums ────────────────────────────────────────────────────────────────────

export enum ProductCategory {
  VEGETABLES = 'VEGETABLES',
  FRUITS = 'FRUITS',
  GRAINS = 'GRAINS',
  DAIRY = 'DAIRY',
  LIVESTOCK = 'LIVESTOCK',
  HERBS = 'HERBS',
  POULTRY = 'POULTRY',
  SEAFOOD = 'SEAFOOD',
  NUTS = 'NUTS',
  OTHER = 'OTHER',
}

export enum ProductUnit {
  KG = 'KG',
  LITER = 'LITER',
  PIECE = 'PIECE',
  BOX = 'BOX',
  BUNCH = 'BUNCH',
  BAG = 'BAG',
  EAR = 'EAR',
}

export enum ListingStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  EXPIRED = 'EXPIRED',
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  farmerId: string;
  name: string;
  description: string;
  category: ProductCategory;
  pricePerUnit: number;
  unit: ProductUnit;
  quantityAvailable: number;
  minimumOrder: number;
  images: string[];
  tags: string[];
  status: ListingStatus;
  expiresAt?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  farmer?: ProductFarmer;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface CreateProductDto {
  name: string;
  description: string;
  category: ProductCategory;
  pricePerUnit: number;
  unit: ProductUnit;
  quantityAvailable: number;
  minimumOrder: number;
  images: string[];
  tags?: string[];
  expiresAt?: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface ProductQueryParams {
  q?: string;
  category?: ProductCategory;
  status?: ListingStatus;
  farmerId?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  unit?: ProductUnit;
}
