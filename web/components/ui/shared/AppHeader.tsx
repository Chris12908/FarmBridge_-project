'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  title?: string;
  backHref?: string;
  rightSlot?: React.ReactNode;
  className?: string;
  showLogo?: boolean;
}

export default function AppHeader({
  title,
  backHref,
  rightSlot,
  className,
  showLogo = false,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-background-light/95 backdrop-blur-sm border-b border-primary/10',
        className
      )}
    >
      <div className="flex items-center h-14 px-4 gap-3">
        {backHref ? (
          <Link
            href={backHref}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-sage transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">arrow_back</span>
          </Link>
        ) : backHref === null ? null : (
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-sage transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">arrow_back</span>
          </button>
        )}

        {showLogo && (
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight text-primary">AgriConnect</span>
          </div>
        )}

        {title && (
          <h1 className="text-base font-semibold text-slate-800 flex-1 truncate">{title}</h1>
        )}

        {!title && !showLogo && <div className="flex-1" />}

        {rightSlot && <div className="flex items-center gap-2 ml-auto">{rightSlot}</div>}
      </div>
    </header>
  );
}
