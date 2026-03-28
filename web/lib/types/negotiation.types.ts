import type { UserProfile } from './user.types';
import type { Product } from './product.types';

// ─── Enums ────────────────────────────────────────────────────────────────────

export enum NegotiationStatus {
  INITIATED = 'INITIATED',
  NEGOTIATING = 'NEGOTIATING',
  PRICE_PROPOSED = 'PRICE_PROPOSED',
  BUYER_APPROVED = 'BUYER_APPROVED',
  BUYER_DECLINED = 'BUYER_DECLINED',
  CHECKED_OUT = 'CHECKED_OUT',
  FULFILLED = 'FULFILLED',
}

export enum MessageType {
  TEXT = 'TEXT',
  VOICE_NOTE = 'VOICE_NOTE',
  IMAGE = 'IMAGE',
  PRICE_PROPOSAL = 'PRICE_PROPOSAL',
  SYSTEM = 'SYSTEM',
}

export enum ProposalStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  COUNTERED = 'COUNTERED',
  EXPIRED = 'EXPIRED',
}

export enum SenderRole {
  BUYER = 'BUYER',
  FARMER = 'FARMER',
}

// ─── Price Proposal ───────────────────────────────────────────────────────────

export interface PriceProposal {
  id: string;
  sessionId: string;
  proposedByUserId: string;
  proposedBy: SenderRole;
  proposedPrice: number;
  proposedQuantity: number;
  note?: string;
  status: ProposalStatus;
  expiresAt?: string;
  createdAt: string;
}

// ─── Chat Message ─────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderRole: SenderRole;
  type: MessageType;
  text?: string;
  voiceNoteUrl?: string;
  voiceNoteDurationSecs?: number;
  imageUrl?: string;
  priceProposal?: PriceProposal;
  readByRecipient: boolean;
  createdAt: string;
}

// ─── Negotiation Session ──────────────────────────────────────────────────────

export interface NegotiationSession {
  id: string;
  buyerId: string;
  farmerId: string;
  productId: string;
  status: NegotiationStatus;
  agreedPrice?: number;
  agreedQuantity?: number;
  lastMessageAt?: string;
  lastMessagePreview?: string;
  buyerUnreadCount: number;
  farmerUnreadCount: number;
  createdAt: string;
  updatedAt: string;
  buyer?: UserProfile;
  farmer?: UserProfile;
  product?: Product;
  proposals?: PriceProposal[];
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface CreateNegotiationDto {
  productId: string;
}

export interface UpdateNegotiationStatusDto {
  status: NegotiationStatus;
}

export interface SendMessageDto {
  sessionId: string;
  type: MessageType;
  text?: string;
  voiceNoteUrl?: string;
  voiceNoteDurationSecs?: number;
  imageUrl?: string;
}

export interface CreateProposalDto {
  proposedPrice: number;
  proposedQuantity: number;
  note?: string;
}

export interface RespondProposalDto {
  action: 'accept' | 'decline';
}
