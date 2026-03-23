'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useChat } from '@/hooks/chat/useChat';
import { useProposals } from '@/hooks/proposals/useProposals';
import { useAuthContext } from '@/providers/AuthProvider';
import { negotiationService } from '@/services/negotiation.service';
import { proposalService } from '@/services/proposal.service';
import { chatService } from '@/services/chat.service';
import { formatCurrency, getInitials } from '@/lib/utils';
import { NegotiationStatus, MessageType, ProposalStatus, SenderRole } from '@/lib/types';
import type { PriceProposal } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ChatMessageBubble from '@/components/ui/shared/ChatMessageBubble';
import { ProposalForm } from '@/components/ui/shared/ProposalForm';
import { VoiceNoteRecorder } from '@/components/ui/shared/VoiceNoteRecorder';
import { OnlineStatusDot } from '@/components/ui/shared/OnlineStatusDot';

export default function BuyerChatPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const sessionId = params.sessionId as string;
  const { user } = useAuthContext();

  const { messages, isLoading, sendMessage, typingUsers, isConnected, hasMore, loadMore, isLoadingMore } = useChat(sessionId);
  const { proposals } = useProposals(sessionId);
  const [inputText, setInputText] = useState('');
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [pendingProposal, setPendingProposal] = useState<PriceProposal | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch session info
  const { data: session } = useQuery({
    queryKey: ['negotiation', sessionId],
    queryFn: () => negotiationService.getNegotiation(sessionId),
    enabled: !!sessionId,
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Respond to proposal mutation
  const respondMutation = useMutation({
    mutationFn: ({
      proposalId,
      action,
      counterPrice,
      counterQuantity,
      counterNote,
    }: {
      proposalId: string;
      action: 'accept' | 'decline' | 'counter';
      counterPrice?: number;
      counterQuantity?: number;
      counterNote?: string;
    }) =>
      proposalService.respondToProposal(sessionId, proposalId, action, {
        counterPrice,
        counterQuantity,
        counterNote,
      }),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['negotiation', sessionId] });
      if (vars.action === 'accept') {
        router.push(`/buyer/checkout/${sessionId}`);
      }
      setShowApprovalDialog(false);
    },
  });

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

  function handleAcceptProposal(proposal: PriceProposal) {
    setPendingProposal(proposal);
    setShowApprovalDialog(true);
  }

  function handleDeclineProposal(proposal: PriceProposal) {
    respondMutation.mutate({ proposalId: proposal.id, action: 'decline' });
  }

  function handleCounterProposal(
    proposal: PriceProposal,
    counterPrice: number,
    counterQuantity: number,
    counterNote?: string,
  ) {
    respondMutation.mutate({
      proposalId: proposal.id,
      action: 'counter',
      counterPrice,
      counterQuantity,
      counterNote,
    });
  }

  const farmerProfile = session?.farmer?.farmerProfile;
  const farmerName = farmerProfile?.farmName ?? session?.farmer?.name ?? 'Farmer';
  const farmerInitials = getInitials(farmerName);
  const productName = session?.product?.name ?? '';
  const sessionStatus = session?.status ?? NegotiationStatus.INITIATED;

  const statusConfig: Record<string, { label: string; color: string }> = {
    [NegotiationStatus.INITIATED]: { label: 'Starting negotiation...', color: 'text-slate-500' },
    [NegotiationStatus.NEGOTIATING]: { label: 'In negotiation', color: 'text-blue-600' },
    [NegotiationStatus.PRICE_PROPOSED]: { label: 'Offer pending', color: 'text-accent-amber' },
    [NegotiationStatus.BUYER_APPROVED]: { label: 'Deal agreed ✓', color: 'text-primary' },
    [NegotiationStatus.BUYER_DECLINED]: { label: 'Offer declined', color: 'text-red-500' },
    [NegotiationStatus.CHECKED_OUT]: { label: 'Order placed', color: 'text-primary' },
    [NegotiationStatus.FULFILLED]: { label: 'Order fulfilled', color: 'text-primary' },
  };

  const statusInfo = statusConfig[sessionStatus] ?? { label: sessionStatus, color: 'text-slate-500' };

  return (
    <div className="flex flex-col h-screen bg-background-light">
      {/* Chat header */}
      <header className="sticky top-0 z-40 bg-background-light/95 backdrop-blur-sm border-b border-primary/10">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link
            href="/buyer/chats"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-sage transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">arrow_back</span>
          </Link>
          <div className="relative w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary text-xs font-bold">{farmerInitials}</span>
            <OnlineStatusDot isOnline={isConnected} size="sm" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{farmerName}</p>
            <p className="text-xs text-text-muted truncate">{productName}</p>
          </div>
          <button
            onClick={() => setShowProposalForm(true)}
            className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
          >
            Send Offer
          </button>
        </div>

        {/* Negotiation status bar */}
        <div className="px-4 py-2 border-t border-primary/5 flex items-center gap-2 bg-neutral-sage/40">
          <span className="material-symbols-outlined text-[14px] text-primary">handshake</span>
          <span className={`text-xs font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
          {typingUsers.length > 0 && (
            <span className="text-xs text-text-muted ml-auto">typing...</span>
          )}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <span className="text-text-muted text-sm">Loading messages...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-primary/30 text-5xl block mb-3">chat</span>
            <p className="text-sm text-text-muted">Start the conversation. Say hello!</p>
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
                currentUserRole={SenderRole.BUYER}
                onAcceptProposal={handleAcceptProposal}
                onDeclineProposal={handleDeclineProposal}
                onCounterProposal={handleCounterProposal}
              />
            ))}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Voice recorder */}
      {showVoiceRecorder && (
        <div className="border-t border-primary/10 bg-background-light px-4 py-3">
          <VoiceNoteRecorder
            onRecorded={(url: string, durationSecs: number) => {
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
            onClick={handleSendText}
            disabled={!inputText.trim()}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center disabled:opacity-40 transition-opacity shrink-0"
          >
            <span className="material-symbols-outlined text-white text-[18px]">send</span>
          </button>
        </div>
      )}

      {/* Proposal Form Dialog */}
      <Dialog open={showProposalForm} onOpenChange={setShowProposalForm}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Send a Price Proposal</DialogTitle>
          </DialogHeader>
          <ProposalForm
            sessionId={sessionId}
            productName={session?.product?.name ?? 'Product'}
            listedPrice={session?.product?.pricePerUnit ?? 0}
            unit={session?.product?.unit ?? 'unit'}
            onSuccess={() => setShowProposalForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Approval Confirmation Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-800">
              <span className="material-symbols-outlined text-primary">verified</span>
              Accept This Offer?
            </DialogTitle>
          </DialogHeader>

          {pendingProposal && (
            <div className="space-y-4">
              <div className="bg-neutral-sage/50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Proposed Price</span>
                  <span className="font-bold text-primary">{formatCurrency(pendingProposal.proposedPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Quantity</span>
                  <span className="font-semibold">{pendingProposal.proposedQuantity}</span>
                </div>
                <div className="flex justify-between border-t border-primary/10 pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-black text-primary">
                    {formatCurrency(pendingProposal.proposedPrice * pendingProposal.proposedQuantity)}
                  </span>
                </div>
              </div>
              {pendingProposal.note && (
                <p className="text-sm text-slate-600 italic">"{pendingProposal.note}"</p>
              )}
              <div className="flex items-center gap-1.5 bg-primary/5 rounded-lg px-3 py-2 text-xs text-primary font-medium">
                <span className="material-symbols-outlined text-[14px]">handshake</span>
                Accepting will take you to checkout
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowApprovalDialog(false)}>
                  Back to Chat
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => pendingProposal && respondMutation.mutate({ proposalId: pendingProposal.id, action: 'accept' })}
                  disabled={respondMutation.isPending}
                >
                  {respondMutation.isPending ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
