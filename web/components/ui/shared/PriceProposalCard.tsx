import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { ProposalStatus, SenderRole } from '@/lib/types/negotiation.types';
import type { PriceProposal } from '@/lib/types/negotiation.types';

interface PriceProposalCardProps {
  proposal: PriceProposal;
  currentUserRole: SenderRole;
  onAccept?: () => void;
  onDecline?: () => void;
  onCounter?: (counterPrice: number, counterQuantity: number, counterNote?: string) => void;
}

export default function PriceProposalCard({
  proposal,
  currentUserRole,
  onAccept,
  onDecline,
  onCounter,
}: PriceProposalCardProps) {
  const [showCounter, setShowCounter] = useState(false);
  const [counterPrice, setCounterPrice] = useState('');
  const [counterQty, setCounterQty] = useState('');
  const [counterNote, setCounterNote] = useState('');

  const isPending = proposal.status === ProposalStatus.PENDING;
  const isRecipient = proposal.proposedBy !== currentUserRole;
  const total = proposal.proposedPrice * proposal.proposedQuantity;

  function handleCounter() {
    const price = Number(counterPrice);
    const qty = Number(counterQty);
    if (!price || !qty || price <= 0 || qty <= 0) return;
    onCounter?.(price, qty, counterNote || undefined);
    setShowCounter(false);
    setCounterPrice('');
    setCounterQty('');
    setCounterNote('');
  }

  return (
    <div className="w-full max-w-[300px] bg-white rounded-2xl border border-primary/15 shadow-md overflow-hidden">
      <div className="bg-primary px-4 py-3">
        <p className="text-white text-xs font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">request_quote</span>
          {proposal.proposedBy === SenderRole.FARMER ? 'Farmer Price Offer' : 'Buyer Price Offer'}
        </p>
        <p className="text-white text-2xl font-black mt-0.5">{formatCurrency(total)}</p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wide">Price / unit</p>
            <p className="text-sm font-semibold text-slate-800">{formatCurrency(proposal.proposedPrice)}</p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wide">Quantity</p>
            <p className="text-sm font-semibold text-slate-800">{proposal.proposedQuantity} units</p>
          </div>
        </div>

        {proposal.note && (
          <p className="text-xs text-text-muted italic mb-3 border-l-2 border-primary/20 pl-2">
            &ldquo;{proposal.note}&rdquo;
          </p>
        )}

        {proposal.status === ProposalStatus.ACCEPTED && (
          <div className="flex items-center gap-1.5 bg-primary/5 rounded-lg px-3 py-2 text-primary text-xs font-semibold">
            <span className="material-symbols-outlined fill-1 text-[16px]">check_circle</span>
            Accepted — Deal Agreed
          </div>
        )}

        {proposal.status === ProposalStatus.DECLINED && (
          <div className="flex items-center gap-1.5 bg-red-50 rounded-lg px-3 py-2 text-red-600 text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">cancel</span>
            Declined
          </div>
        )}

        {proposal.status === ProposalStatus.EXPIRED && (
          <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-3 py-2 text-slate-500 text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            Expired
          </div>
        )}

        {proposal.status === ProposalStatus.COUNTERED && (
          <div className="flex items-center gap-1.5 bg-accent-amber/10 rounded-lg px-3 py-2 text-accent-amber text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">sync_alt</span>
            Counter offer made
          </div>
        )}

        {isPending && !isRecipient && (
          <div className="flex items-center gap-1.5 bg-accent-amber/10 rounded-lg px-3 py-2 text-accent-amber text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            Awaiting response
          </div>
        )}

        {isPending && isRecipient && !showCounter && (
          <div className="flex gap-2 mt-1">
            <button
              onClick={onDecline}
              className="flex-1 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={() => setShowCounter(true)}
              className="flex-1 py-2 rounded-lg border border-primary/30 text-xs font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              Counter
            </button>
            <button
              onClick={onAccept}
              className="flex-1 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              Accept
            </button>
          </div>
        )}

        {isPending && isRecipient && showCounter && (
          <div className="mt-2 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder={String(proposal.proposedPrice)}
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">Qty</label>
                <input
                  type="number"
                  placeholder={String(proposal.proposedQuantity)}
                  value={counterQty}
                  onChange={(e) => setCounterQty(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Note (optional)"
              value={counterNote}
              onChange={(e) => setCounterNote(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowCounter(false)}
                className="flex-1 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCounter}
                disabled={!counterPrice || !counterQty}
                className="flex-1 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Send Counter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
