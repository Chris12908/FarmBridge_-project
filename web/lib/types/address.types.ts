// ─── Address ──────────────────────────────────────────────────────────────────

export interface Address {
  id: string;
  userId: string;
  label: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  createdAt: string;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface CreateAddressDto {
  label: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault?: boolean;
}

export type UpdateAddressDto = Partial<CreateAddressDto>;
