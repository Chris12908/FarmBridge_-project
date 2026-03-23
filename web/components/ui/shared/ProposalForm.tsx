"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSendProposal } from "@/hooks/proposals/useSendProposal";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const proposalSchema = z.object({
  proposedPrice: z
    .number({ error: "Enter a valid price" })
    .positive("Price must be greater than 0"),
  proposedQuantity: z
    .number({ error: "Enter a valid quantity" })
    .positive("Quantity must be greater than 0")
    .int("Quantity must be a whole number"),
  note: z.string().max(200, "Note must be under 200 characters").optional(),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface ProposalFormProps {
  sessionId: string;
  productName: string;
  listedPrice: number;
  unit: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProposalForm({
  sessionId,
  productName,
  listedPrice,
  unit,
  onSuccess,
  onCancel,
}: ProposalFormProps) {
  const { sendProposal } = useSendProposal(sessionId);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      proposedPrice: listedPrice,
      proposedQuantity: 1,
    },
  });

  const proposedPrice = watch("proposedPrice");
  const proposedQuantity = watch("proposedQuantity");
  const total = (proposedPrice || 0) * (proposedQuantity || 0);
  const savings = (listedPrice - (proposedPrice || 0)) * (proposedQuantity || 0);

  function onSubmit(data: ProposalFormData) {
    sendProposal.mutate(data, {
      onSuccess: () => {
        toast.success("Price proposal sent!");
        onSuccess?.();
      },
      onError: (err: unknown) => {
        const message = err instanceof Error ? err.message : "Failed to send proposal";
        toast.error(message);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Product reference */}
      <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
        <span className="material-symbols-outlined text-primary text-xl">storefront</span>
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{productName}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Listed at {formatCurrency(listedPrice)} / {unit}
          </p>
        </div>
      </div>

      {/* Price + Quantity */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            Your Price (KES)
          </label>
          <input
            {...register("proposedPrice", { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
            placeholder={String(listedPrice)}
            className={fieldCls(!!errors.proposedPrice)}
          />
          {errors.proposedPrice && (
            <p className="text-xs text-red-500 mt-1">{errors.proposedPrice.message}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            Quantity ({unit})
          </label>
          <input
            {...register("proposedQuantity", { valueAsNumber: true })}
            type="number"
            min="1"
            step="1"
            placeholder="1"
            className={fieldCls(!!errors.proposedQuantity)}
          />
          {errors.proposedQuantity && (
            <p className="text-xs text-red-500 mt-1">{errors.proposedQuantity.message}</p>
          )}
        </div>
      </div>

      {/* Summary */}
      {total > 0 && (
        <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Total proposal</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {formatCurrency(total)}
            </span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-xs">
              <span className="text-green-600 dark:text-green-400">Your savings</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {formatCurrency(savings)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Note */}
      <div>
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
          Message (optional)
        </label>
        <textarea
          {...register("note")}
          rows={2}
          placeholder="Add a note to the farmer..."
          className={cn(fieldCls(!!errors.note), "resize-none")}
        />
        {errors.note && <p className="text-xs text-red-500 mt-1">{errors.note.message}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={sendProposal.isPending}
          className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-60 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          {sendProposal.isPending && (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          )}
          Send Proposal
        </button>
      </div>
    </form>
  );
}

function fieldCls(hasError: boolean) {
  return cn(
    "w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all",
    hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-slate-200 dark:border-slate-700 focus:border-primary"
  );
}
