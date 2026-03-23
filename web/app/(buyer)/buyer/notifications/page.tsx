'use client';

import Link from 'next/link';
import { useNotifications } from '@/hooks/notifications/useNotifications';
import { NotificationType } from '@/lib/types/notification.types';
import type { AppNotification } from '@/lib/types/notification.types';
import { formatRelativeTime } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';

const ICON_MAP: Partial<Record<NotificationType, string>> = {
  [NotificationType.NEW_MESSAGE]: 'chat',
  [NotificationType.PRICE_PROPOSAL]: 'request_quote',
  [NotificationType.OFFER_ACCEPTED]: 'handshake',
  [NotificationType.OFFER_DECLINED]: 'cancel',
  [NotificationType.ORDER_CONFIRMED]: 'check_circle',
  [NotificationType.ORDER_DISPATCHED]: 'local_shipping',
  [NotificationType.ORDER_DELIVERED]: 'inventory',
  [NotificationType.LISTING_EXPIRING]: 'update',
  [NotificationType.REVIEW_REQUEST]: 'star',
  [NotificationType.PAYMENT_RECEIVED]: 'payments',
  [NotificationType.SYSTEM]: 'info',
};

const COLOR_MAP: Partial<Record<NotificationType, string>> = {
  [NotificationType.NEW_MESSAGE]: 'bg-blue-50 text-blue-600',
  [NotificationType.PRICE_PROPOSAL]: 'bg-accent-amber/10 text-accent-amber',
  [NotificationType.OFFER_ACCEPTED]: 'bg-primary/10 text-primary',
  [NotificationType.OFFER_DECLINED]: 'bg-red-50 text-red-500',
  [NotificationType.ORDER_CONFIRMED]: 'bg-primary/10 text-primary',
  [NotificationType.ORDER_DISPATCHED]: 'bg-purple-50 text-purple-600',
  [NotificationType.ORDER_DELIVERED]: 'bg-primary/10 text-primary',
  [NotificationType.LISTING_EXPIRING]: 'bg-slate-100 text-slate-500',
  [NotificationType.REVIEW_REQUEST]: 'bg-accent-amber/10 text-accent-amber',
  [NotificationType.PAYMENT_RECEIVED]: 'bg-primary/10 text-primary',
  [NotificationType.SYSTEM]: 'bg-slate-100 text-slate-600',
};

function NotificationItem({
  notif,
  onRead,
}: {
  notif: AppNotification;
  onRead: (id: string) => void;
}) {
  const iconClass = COLOR_MAP[notif.type] ?? 'bg-slate-100 text-slate-500';
  const icon = ICON_MAP[notif.type] ?? 'notifications';
  const linkTo = (notif.data?.linkTo as string) ?? null;

  const content = (
    <div
      className={`flex gap-3 px-4 py-3 ${!notif.isRead ? 'bg-primary/[0.03]' : ''}`}
      onClick={() => !notif.isRead && onRead(notif.id)}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconClass}`}>
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm font-semibold text-slate-800 leading-tight ${!notif.isRead ? 'text-slate-900' : ''}`}>
            {notif.title}
          </p>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-text-muted whitespace-nowrap">
              {formatRelativeTime(notif.createdAt)}
            </span>
            {!notif.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
          </div>
        </div>
        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{notif.body}</p>
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link href={linkTo} className="block hover:bg-neutral-sage/40 transition-colors">
        {content}
      </Link>
    );
  }

  return <div className="hover:bg-neutral-sage/40 transition-colors cursor-pointer">{content}</div>;
}

export default function NotificationsPage() {
  const { notifications, isLoading, markRead, markAllRead } = useNotifications();
  const unread = notifications.filter((n) => !n.isRead);
  const messageTypes = [NotificationType.NEW_MESSAGE, NotificationType.PRICE_PROPOSAL];
  const messages = notifications.filter((n) => messageTypes.includes(n.type));

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between px-4 py-4 border-b border-primary/10">
        <h1 className="text-lg font-black text-slate-800">Notifications</h1>
        {unread.length > 0 && (
          <button
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
          >
            Mark all as read
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="divide-y divide-primary/5">
          <SkeletonCard variant="notification" count={8} />
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="w-full rounded-none border-b border-primary/10 bg-transparent h-11 px-4 gap-4 justify-start">
            <TabsTrigger
              value="all"
              className="text-xs font-semibold px-0 pb-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
            >
              All
              {notifications.length > 0 && (
                <span className="ml-1.5 text-text-muted">({notifications.length})</span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="text-xs font-semibold px-0 pb-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
            >
              Unread
              {unread.length > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {unread.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="text-xs font-semibold px-0 pb-2 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
            >
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0 divide-y divide-primary/5">
            {notifications.length === 0 ? (
              <p className="text-center text-text-muted text-sm py-12">No notifications yet</p>
            ) : (
              notifications.map((n) => (
                <NotificationItem key={n.id} notif={n} onRead={(id) => markRead.mutate(id)} />
              ))
            )}
          </TabsContent>
          <TabsContent value="unread" className="mt-0 divide-y divide-primary/5">
            {unread.length === 0 ? (
              <p className="text-center text-text-muted text-sm py-12">All caught up!</p>
            ) : (
              unread.map((n) => (
                <NotificationItem key={n.id} notif={n} onRead={(id) => markRead.mutate(id)} />
              ))
            )}
          </TabsContent>
          <TabsContent value="messages" className="mt-0 divide-y divide-primary/5">
            {messages.length === 0 ? (
              <p className="text-center text-text-muted text-sm py-12">No message notifications</p>
            ) : (
              messages.map((n) => (
                <NotificationItem key={n.id} notif={n} onRead={(id) => markRead.mutate(id)} />
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
