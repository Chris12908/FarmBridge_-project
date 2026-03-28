'use client';

import Link from 'next/link';
import { useChatInbox } from '@/hooks/chat/useChatInbox';
import { NegotiationStatusBadge } from '@/components/ui/shared/NegotiationStatusBadge';
import EmptyState from '@/components/ui/shared/EmptyState';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';
import { buttonVariants } from '@/components/ui/button';
import { formatRelativeTime, getInitials } from '@/lib/utils';
import type { NegotiationSession } from '@/lib/types';
import { MessageType } from '@/lib/types';

function ChatThreadRow({ session }: { session: NegotiationSession }) {
  const isUnread = session.buyerUnreadCount > 0;

  const lastText = session.lastMessagePreview
    ? session.lastMessagePreview
    : 'Chat started';

  const productImage = session.product?.images?.[0];
  const productName = session.product?.name ?? 'Product';
  const farmerName = session.farmer?.farmerProfile?.farmName ?? session.farmer?.name ?? 'Farmer';
  const farmerInitials = getInitials(farmerName);

  return (
    <Link href={`/buyer/chat/${session.id}`} className="block">
      <div className={`flex gap-3 p-4 hover:bg-neutral-sage/30 transition-colors ${isUnread ? 'bg-primary/[0.02]' : ''}`}>
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <span className="text-primary text-sm font-bold">{farmerInitials}</span>
          </div>
          {isUnread && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {session.buyerUnreadCount}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <p className={`text-sm font-semibold truncate ${isUnread ? 'text-slate-900' : 'text-slate-700'}`}>
              {farmerName}
            </p>
            <span className="text-[10px] text-text-muted whitespace-nowrap ml-2">
              {session.lastMessageAt ? formatRelativeTime(session.lastMessageAt) : ''}
            </span>
          </div>

          {productName && (
            <div className="flex items-center gap-1.5 mb-1">
              {productImage && (
                <div className="relative w-4 h-4 rounded overflow-hidden shrink-0 bg-slate-100">
                  <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-xs text-text-muted truncate">{productName}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className={`text-xs truncate max-w-[180px] ${isUnread ? 'font-medium text-slate-600' : 'text-text-muted'}`}>
              {lastText}
            </p>
            <NegotiationStatusBadge status={session.status} />
          </div>
        </div>

        <div className="flex items-center shrink-0">
          <span className="material-symbols-outlined text-text-muted text-[18px]">chevron_right</span>
        </div>
      </div>
    </Link>
  );
}

export default function BuyerChatsPage() {
  const { sessions, isLoading } = useChatInbox();
  const totalUnread = sessions.reduce((sum, s) => sum + s.buyerUnreadCount, 0);

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 py-4 border-b border-primary/10">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black text-slate-800">My Negotiations</h1>
          {totalUnread > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {totalUnread} unread
            </span>
          )}
        </div>
        <p className="text-xs text-text-muted mt-0.5">Chat with farmers to negotiate prices</p>
      </div>

      {isLoading ? (
        <div className="divide-y divide-primary/5">
          <SkeletonCard variant="chat" count={5} />
        </div>
      ) : sessions.length === 0 ? (
        <EmptyState
          icon="chat"
          title="No negotiations yet"
          description="When you chat with a farmer about a product, your negotiation thread will appear here."
          action={
            <Link href="/buyer/marketplace" className={buttonVariants()}>Browse Products</Link>
          }
        />
      ) : (
        <div className="divide-y divide-primary/5">
          {sessions.map((session) => (
            <ChatThreadRow key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}
