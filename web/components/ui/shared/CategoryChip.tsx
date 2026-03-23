'use client';

import { cn } from '@/lib/utils';
import type { CategoryConfig } from '@/lib/categories';

interface CategoryChipProps {
  category: CategoryConfig;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryChip({ category, active = false, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border',
        active
          ? 'bg-primary text-white border-primary shadow-sm'
          : 'bg-white text-slate-600 border-primary/15 hover:border-primary/30 hover:text-primary'
      )}
    >
      <span className={cn('material-symbols-outlined text-[16px]', active ? 'fill-1' : '')}>
        {category.icon}
      </span>
      {category.label}
    </button>
  );
}
