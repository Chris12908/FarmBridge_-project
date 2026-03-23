'use client';

import Link from 'next/link';
import { useChatInbox } from '@/hooks/chat/useChatInbox';
import { NegotiationStatus } from '@/lib/types';
import { NegotiationStatusBadge } from '@/components/ui/shared/NegotiationStatusBadge';
import EmptyState from '@/components/ui/shared/EmptyState';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';
import { formatRelativeTime, getInitials } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { NegotiationSession } from '@/lib/types';

function ChatThreadItem({ session }: { session: NegotiationSession }) {
  const isUnread = session.farmerUnreadCount > 0;
  const buyerName = session.buyer?.name ?? 'Buyer';
  const buyerInitials = getInitials(buyerName);
  const productName = session.product?.name ?? '';

  return (
    <Link href={`/farmer/chats/${session.id}`} className="block">
      <div className={`flex gap-3 p-4 hover:bg-neutral-sage/30 transition-colors ${isUnread ? 'bg-primary/[0.02]' : ''}`}>
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="text-blue-600 text-sm font-bold">{buyerInitials}</span>
          </div>
          {isUnread && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {session.farmerUnreadCount}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <p className={`text-sm font-semibold truncate ${isUnread ? 'text-slate-900' : 'text-slate-700'}`}>
              {buyerName}
            </p>
            <span className="text-[10px] text-text-muted whitespace-nowrap ml-2">
              {session.lastMessageAt ? formatRelativeTime(session.lastMessageAt) : ''}
            </span>
          </div>
          {productName && (
            <p className="text-xs text-text-muted truncate mb-1">{productName}</p>
          )}
          <div className="flex items-center justify-between">
            <p className={`text-xs truncate max-w-[180px] ${isUnread ? 'font-medium text-slate-600' : 'text-text-muted'}`}>
              {session.lastMessagePreview ?? 'No messages yet'}
            </p>
            <NegotiationStatusBadge status={session.status} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FarmerChatInboxPage() {
  const { sessions, isLoading } = useChatInbox();

  const activeStatuses = [
    NegotiationStatus.INITIATED,
    NegotiationStatus.NEGOTIATING,
    NegotiationStatus.PRICE_PROPOSED,
    NegotiationStatus.BUYER_APPROVED,
  ];
  const active = sessions.filter((s) => activeStatuses.includes(s.status));
  const completed = sessions.filter((s) => !activeStatuses.includes(s.status));
  const totalUnread = sessions.reduce((sum, s) => sum + s.farmerUnreadCount, 0);

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 py-4 border-b border-primary/10">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black text-slate-800">Negotiations</h1>
          {totalUnread > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {totalUnread} unread
            </span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="divide-y divide-primary/5">
          <SkeletonCard variant="chat" count={5} />
        </div>
      ) : (
        <Tabs defaultValue="active">
          <TabsList className="w-full rounded-none border-b border-primary/10 bg-transparent h-11 px-4 gap-6 justify-start">
            <TabsTrigger value="active" className="text-xs font-semibold px-0 pb-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent">
              Active ({active.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs font-semibold px-0 pb-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent">
              Completed ({completed.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-0 divide-y divide-primary/5">
            {active.length === 0 ? (
              <EmptyState icon="chat" title="No active negotiations" description="When buyers inquire about your products, they'll appear here." />
            ) : (
              active.map((s) => <ChatThreadItem key={s.id} session={s} />)
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-0 divide-y divide-primary/5">
            {completed.length === 0 ? (
              <EmptyState icon="done_all" title="No completed negotiations yet" />
            ) : (
              completed.map((s) => <ChatThreadItem key={s.id} session={s} />)
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
