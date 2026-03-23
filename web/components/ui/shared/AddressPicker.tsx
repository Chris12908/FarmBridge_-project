"use client";

import { useAddresses } from "@/hooks/addresses/useAddresses";
import { SkeletonCard } from "./SkeletonCard";
import { cn } from "@/lib/utils";

interface AddressPickerProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddNew: () => void;
  className?: string;
}

export function AddressPicker({ selectedId, onSelect, onAddNew, className }: AddressPickerProps) {
  const { addresses, isLoading } = useAddresses();

  if (isLoading) {
    return (
      <div className={cn("space-y-2", className)}>
        <SkeletonCard variant="order" count={2} />
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {addresses.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
          No saved addresses yet.
        </p>
      )}

      {addresses.map((addr) => {
        const selected = selectedId === addr.id;
        return (
          <button
            key={addr.id}
            type="button"
            onClick={() => onSelect(addr.id)}
            className={cn(
              "w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all",
              selected
                ? "border-primary bg-primary/5 dark:bg-primary/10"
                : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
            )}
          >
            {/* Radio dot */}
            <div
              className={cn(
                "mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                selected ? "border-primary" : "border-slate-300 dark:border-slate-600"
              )}
            >
              {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    selected ? "text-primary" : "text-slate-800 dark:text-slate-200"
                  )}
                >
                  {addr.label}
                </span>
                {addr.isDefault && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {addr.street}, {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
              </p>
            </div>
          </button>
        );
      })}

      <button
        type="button"
        onClick={onAddNew}
        className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary/40 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-primary"
      >
        <span className="material-symbols-outlined text-xl">add_location</span>
        Add a new address
      </button>
    </div>
  );
}
