"use client";

import Link from "next/link";
import { useUnreadCount } from "@/hooks/notifications/useUnreadCount";
import { cn } from "@/lib/utils";

interface NotificationBellProps {
  href: string;
  className?: string;
}

export function NotificationBell({ href, className }: NotificationBellProps) {
  const { unreadCount } = useUnreadCount();

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors",
        className
      )}
      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
    >
      <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 text-[22px]">
        notifications
      </span>
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
