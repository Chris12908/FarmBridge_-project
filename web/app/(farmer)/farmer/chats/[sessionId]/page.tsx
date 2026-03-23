'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ChatMessageBubble from '@/components/ui/shared/ChatMessageBubble';
import { VoiceNoteRecorder } from '@/components/ui/shared/VoiceNoteRecorder';
import { NegotiationStatusBadge } from '@/components/ui/shared/NegotiationStatusBadge';
import { useChat } from '@/hooks/chat/useChat';
import { useProposals } from '@/hooks/proposals/useProposals';
import { useSendProposal } from '@/hooks/proposals/useSendProposal';
import { useAuthContext } from '@/providers/AuthProvider';
import { negotiationService } from '@/services/negotiation.service';
import { chatService } from '@/services/chat.service';
import { MessageType, SenderRole } from '@/lib/types/negotiation.types';
import { QUERY_KEYS } from '@/lib/constants';
import { formatCurrency, getInitials } from '@/lib/utils';
import type { PriceProposal } from '@/lib/types/negotiation.types';

const STATUS_INFO: Record<string, string> = {
  INITIATED: 'Chat started · Send a price offer to begin negotiation',
  NEGOTIATING: 'In negotiation · Tap the amber button to send a price offer',
  PRICE_PROPOSED: 'Waiting for buyer response to your offer',
  BUYER_APPROVED: 'Buyer accepted — Awaiting their checkout',
  BUYER_DECLINED: 'Buyer declined · Continue negotiating',
  CHECKED_OUT: 'Order placed by buyer',
  FULFILLED: 'Order fulfilled',
};

export default function FarmerChatViewPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const { user } = useAuthContext();

  const { messages, isLoading, sendMessage, typingUsers, markRead, hasMore, loadMore, isLoadingMore } = useChat(sessionId);
  const { proposals } = useProposals(sessionId);
  const { sendProposal, respondToProposal } = useSendProposal(sessionId);

  const [inputText, setInputText] = useState('');
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerQuantity, setOfferQuantity] = useState('');
  const [offerNote, setOfferNote] = useState('');
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: session } = useQuery({
    queryKey: QUERY_KEYS.NEGOTIATIONS.detail(sessionId),
    queryFn: () => negotiationService.getNegotiation(sessionId),
    enabled: !!sessionId,
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    return () => { markRead(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSendText() {
    if (!inputText.trim()) return;
    sendMessage({ type: MessageType.TEXT, text: inputText.trim() });
    setInputText('');
  }

  function handleTyping() {
    chatService.sendTyping(sessionId, true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      chatService.sendTyping(sessionId, false);
    }, 3000);
  }

  function handleSendOffer() {
    const price = parseFloat(offerPrice);
    const qty = parseFloat(offerQuantity);
    if (!price || !qty) return;
    sendProposal.mutate(
      { proposedPrice: price, proposedQuantity: qty, note: offerNote || undefined },
      {
        onSuccess: () => {
          toast.success('Price offer sent!');
          setShowOfferDialog(false);
          setOfferPrice('');
          setOfferQuantity('');
          setOfferNote('');
        },
        onError: (err: unknown) => {
          toast.error((err as Error)?.message ?? 'Failed to send offer');
        },
      }
    );
  }

  function handleRespondToProposal(proposal: PriceProposal, action: 'accept' | 'decline') {
    respondToProposal.mutate(
      { proposalId: proposal.id, action },
      {
        onSuccess: () => {
          toast.success(action === 'accept' ? 'Proposal accepted!' : 'Proposal declined');
        },
        onError: (err: unknown) => {
          toast.error((err as Error)?.message ?? 'Action failed');
        },
      }
    );
  }

  function handleCounterProposal(
    proposal: PriceProposal,
    counterPrice: number,
    counterQuantity: number,
    counterNote?: string,
  ) {
    respondToProposal.mutate(
      { proposalId: proposal.id, action: 'counter', counterPrice, counterQuantity, counterNote },
      {
        onSuccess: () => toast.success('Counter offer sent!'),
        onError: (err: unknown) => toast.error((err as Error)?.message ?? 'Failed to send counter'),
      }
    );
  }

  const buyerName = session?.buyer?.name ?? 'Buyer';
  const productName = session?.product?.name ?? 'Product';

  return (
    <div className="flex flex-col h-screen bg-background-light">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background-light/95 backdrop-blur-sm border-b border-primary/10">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link
            href="/farmer/chats"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-sage transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">arrow_back</span>
          </Link>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">{getInitials(buyerName)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{buyerName}</p>
            <p className="text-xs text-text-muted truncate">{productName}</p>
          </div>
          {session?.status && <NegotiationStatusBadge status={session.status} />}
        </div>
        <div className="px-4 py-2 border-t border-primary/5 bg-neutral-sage/40">
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-accent-amber">schedule</span>
            {STATUS_INFO[session?.status ?? 'INITIATED'] ?? 'In negotiation'}
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">chat</span>
            <p className="text-sm text-text-muted">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <>
            {hasMore && (
              <div className="flex justify-center pt-1 pb-3">
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="text-xs font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full hover:bg-primary/20 disabled:opacity-50 transition-colors"
                >
                  {isLoadingMore ? 'Loading...' : 'Load older messages'}
                </button>
              </div>
            )}
            {messages.map((msg) => (
              <ChatMessageBubble
                key={msg.id}
                message={msg}
                currentUserRole={SenderRole.FARMER}
                onAcceptProposal={(p) => handleRespondToProposal(p, 'accept')}
                onDeclineProposal={(p) => handleRespondToProposal(p, 'decline')}
                onCounterProposal={handleCounterProposal}
              />
            ))}
          </>
        )}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-white border border-primary/10 rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
            <span className="text-xs text-text-muted">Buyer is typing...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Voice recorder overlay */}
      {showVoiceRecorder && (
        <div className="border-t border-primary/10 bg-background-light px-4 py-3">
          <VoiceNoteRecorder
            onRecorded={(url, durationSecs) => {
              sendMessage({ type: MessageType.VOICE_NOTE, voiceNoteUrl: url, voiceNoteDurationSecs: durationSecs });
              setShowVoiceRecorder(false);
            }}
            onCancel={() => setShowVoiceRecorder(false)}
          />
        </div>
      )}

      {/* Input footer */}
      {!showVoiceRecorder && (
        <div className="border-t border-primary/10 bg-background-light px-4 py-3 pb-20 flex items-center gap-2">
          <button
            onClick={() => setShowVoiceRecorder(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-sage transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-slate-500 text-[20px]">mic</span>
          </button>
          <Input
            value={inputText}
            onChange={(e) => { setInputText(e.target.value); handleTyping(); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
            placeholder="Type a message..."
            className="flex-1 bg-neutral-sage border-0 rounded-full h-10"
          />
          <button
            onClick={() => setShowOfferDialog(true)}
            className="w-9 h-9 rounded-full bg-accent-amber flex items-center justify-center shrink-0 hover:bg-accent-amber/90 transition-colors"
            title="Send price offer"
          >
            <span className="material-symbols-outlined text-white text-[18px]">payments</span>
          </button>
          <button
            onClick={handleSendText}
            disabled={!inputText.trim()}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center disabled:opacity-40 transition-opacity shrink-0"
          >
            <span className="material-symbols-outlined text-white text-[18px]">send</span>
          </button>
        </div>
      )}

      {/* Price Offer Dialog */}
      <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-800">
              <span className="material-symbols-outlined text-accent-amber">payments</span>
              Send Price Offer
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-3 bg-neutral-sage/50 rounded-xl p-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px]">inventory_2</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{productName}</p>
                {session?.product?.pricePerUnit && (
                  <p className="text-xs text-text-muted">
                    Listed: {formatCurrency(session.product.pricePerUnit)}/{session.product.unit ?? 'unit'}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                  Price / unit
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                  <Input
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    placeholder="0.00"
                    className="h-11 pl-7 border-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                  Quantity
                </label>
                <Input
                  type="number"
                  value={offerQuantity}
                  onChange={(e) => setOfferQuantity(e.target.value)}
                  placeholder="e.g. 100"
                  className="h-11 border-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
                Note (optional)
              </label>
              <Input
                value={offerNote}
                onChange={(e) => setOfferNote(e.target.value)}
                placeholder="e.g. Price valid for bulk orders"
                className="border-primary/20"
              />
            </div>

            {offerPrice && offerQuantity && (
              <div className="bg-primary/5 rounded-xl p-3 flex justify-between items-center">
                <span className="text-sm text-text-muted">Total estimate</span>
                <span className="text-lg font-black text-primary">
                  {formatCurrency(parseFloat(offerPrice) * parseFloat(offerQuantity))}
                </span>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowOfferDialog(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-accent-amber hover:bg-accent-amber/90"
                disabled={!offerPrice || !offerQuantity || sendProposal.isPending}
                onClick={handleSendOffer}
              >
                {sendProposal.isPending ? 'Sending...' : 'Send Offer'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
