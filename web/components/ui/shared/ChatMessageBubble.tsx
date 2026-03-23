import { cn, formatRelativeTime } from '@/lib/utils';
import { MessageType, SenderRole } from '@/lib/types/negotiation.types';
import type { ChatMessage, PriceProposal } from '@/lib/types/negotiation.types';
import VoiceNotePlayer from './VoiceNotePlayer';
import PriceProposalCard from './PriceProposalCard';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  currentUserRole: SenderRole;
  onAcceptProposal?: (proposal: PriceProposal) => void;
  onDeclineProposal?: (proposal: PriceProposal) => void;
  onCounterProposal?: (proposal: PriceProposal, counterPrice: number, counterQuantity: number, counterNote?: string) => void;
}

export default function ChatMessageBubble({
  message,
  currentUserRole,
  onAcceptProposal,
  onDeclineProposal,
  onCounterProposal,
}: ChatMessageBubbleProps) {
  const isOwn = message.senderRole === currentUserRole;

  if (message.type === MessageType.SYSTEM) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs text-text-muted bg-neutral-sage px-3 py-1 rounded-full">
          {message.text}
        </span>
      </div>
    );
  }

  if (message.type === MessageType.PRICE_PROPOSAL && message.priceProposal) {
    return (
      <div className={cn('flex mb-3', isOwn ? 'justify-end' : 'justify-start')}>
        <div>
          <PriceProposalCard
            proposal={message.priceProposal}
            currentUserRole={currentUserRole}
            onAccept={onAcceptProposal ? () => onAcceptProposal(message.priceProposal!) : undefined}
            onDecline={onDeclineProposal ? () => onDeclineProposal(message.priceProposal!) : undefined}
            onCounter={onCounterProposal ? (price, qty, note) => onCounterProposal(message.priceProposal!, price, qty, note) : undefined}
          />
          <p className={cn('text-[10px] text-text-muted mt-1', isOwn ? 'text-right' : 'text-left')}>
            {formatRelativeTime(message.createdAt)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex mb-3', isOwn ? 'justify-end' : 'justify-start')}>
      <div className={cn('flex flex-col max-w-[75%]', isOwn ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'px-4 py-3 rounded-2xl',
            isOwn
              ? 'bg-primary text-white rounded-tr-none'
              : 'bg-white border border-primary/10 text-slate-800 rounded-tl-none shadow-sm'
          )}
        >
          {message.type === MessageType.VOICE_NOTE && message.voiceNoteDurationSecs !== undefined ? (
            <VoiceNotePlayer
              voiceNoteUrl={message.voiceNoteUrl ?? ''}
              durationSecs={message.voiceNoteDurationSecs}
              isOwn={isOwn}
            />
          ) : (
            <p className="text-sm leading-relaxed">{message.text}</p>
          )}
        </div>
        <span className="text-[10px] text-text-muted mt-1">
          {formatRelativeTime(message.createdAt)}
          {isOwn && (
            <span className="ml-1">
              {message.readByRecipient ? (
                <span className="material-symbols-outlined text-[12px] text-blue-400 fill-1">done_all</span>
              ) : (
                <span className="material-symbols-outlined text-[12px] text-text-muted">done</span>
              )}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
