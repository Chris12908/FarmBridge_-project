import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/lib/types/order.types";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  className?: string;
}

const METHODS: { id: PaymentMethod; label: string; sub: string; icon: string }[] = [
  {
    id: "STRIPE",
    label: "Credit / Debit Card",
    sub: "Visa, Mastercard, Amex — powered by Stripe",
    icon: "credit_card",
  },
  {
    id: "FLUTTERWAVE_MPESA",
    label: "M-Pesa",
    sub: "Safaricom M-Pesa mobile money",
    icon: "mobile_friendly",
  },
  {
    id: "FLUTTERWAVE_MTN",
    label: "MTN Mobile Money",
    sub: "MTN MoMo — powered by Flutterwave",
    icon: "mobile_friendly",
  },
  {
    id: "FLUTTERWAVE_ORANGE",
    label: "Orange Money",
    sub: "Orange Money — powered by Flutterwave",
    icon: "mobile_friendly",
  },
];

export function PaymentMethodSelector({ value, onChange, className }: PaymentMethodSelectorProps) {
  return (
    <div className={cn("grid gap-3", className)}>
      {METHODS.map((method) => {
        const selected = value === method.id;
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all",
              selected
                ? "border-primary bg-primary/5 dark:bg-primary/10"
                : "border-slate-200 dark:border-slate-700 hover:border-primary/40"
            )}
          >
            <div
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                selected
                  ? "bg-primary text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
              )}
            >
              <span className="material-symbols-outlined text-xl">{method.icon}</span>
            </div>
            <div className="flex-1">
              <p
                className={cn(
                  "text-sm font-semibold",
                  selected ? "text-primary" : "text-slate-800 dark:text-slate-200"
                )}
              >
                {method.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{method.sub}</p>
            </div>
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                selected ? "border-primary" : "border-slate-300 dark:border-slate-600"
              )}
            >
              {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
