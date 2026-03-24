import { ConflictException } from '@nestjs/common';
import { NegotiationStatus } from '@prisma-client';

const ALLOWED_TRANSITIONS: Record<NegotiationStatus, NegotiationStatus[]> = {
  [NegotiationStatus.INITIATED]: [
    NegotiationStatus.NEGOTIATING,
    NegotiationStatus.BUYER_DECLINED,
  ],
  [NegotiationStatus.NEGOTIATING]: [
    NegotiationStatus.PRICE_PROPOSED,
    NegotiationStatus.BUYER_DECLINED,
  ],
  [NegotiationStatus.PRICE_PROPOSED]: [
    NegotiationStatus.NEGOTIATING,
    NegotiationStatus.BUYER_APPROVED,
    NegotiationStatus.BUYER_DECLINED,
    NegotiationStatus.PRICE_PROPOSED, // counter offer keeps session in same state
  ],
  [NegotiationStatus.BUYER_APPROVED]: [
    NegotiationStatus.CHECKED_OUT,
    NegotiationStatus.NEGOTIATING,
    NegotiationStatus.PRICE_PROPOSED,
    NegotiationStatus.BUYER_APPROVED, // re-accept/supersede when a pending proposal exists
  ],
  [NegotiationStatus.CHECKED_OUT]: [
    NegotiationStatus.FULFILLED,
    NegotiationStatus.NEGOTIATING,
    NegotiationStatus.PRICE_PROPOSED,
  ],
  [NegotiationStatus.BUYER_DECLINED]: [],
  [NegotiationStatus.FULFILLED]: [],
};

export function validateTransition(
  current: NegotiationStatus,
  next: NegotiationStatus,
): void {
  const allowed = ALLOWED_TRANSITIONS[current];
  if (!allowed.includes(next)) {
    throw new ConflictException(
      `Cannot transition from ${current} to ${next}. Allowed: ${allowed.join(', ') || 'none'}`,
    );
  }
}
