import { OrderStatus } from "@/lib/types/order.types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface OrderTimelineProps {
  status: OrderStatus;
  confirmedAt?: string;
  dispatchedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt?: string;
}

const STEPS = [
  { key: "PENDING", label: "Order Placed", icon: "receipt_long" },
  { key: "CONFIRMED", label: "Confirmed", icon: "task_alt" },
  { key: "DISPATCHED", label: "Dispatched", icon: "local_shipping" },
  { key: "DELIVERED", label: "Delivered", icon: "home" },
] as const;

const STATUS_ORDER: Record<string, number> = {
  PENDING: 0,
  CONFIRMED: 1,
  DISPATCHED: 2,
  DELIVERED: 3,
  CANCELLED: -1,
  REFUNDED: -1,
};

export function OrderTimeline({
  status,
  confirmedAt,
  dispatchedAt,
  deliveredAt,
  createdAt,
  cancelledAt,
}: OrderTimelineProps) {
  const isCancelled = status === OrderStatus.CANCELLED || status === OrderStatus.REFUNDED;
  const currentStep = STATUS_ORDER[status] ?? 0;

  const timestamps: Record<string, string | undefined> = {
    PENDING: createdAt,
    CONFIRMED: confirmedAt,
    DISPATCHED: dispatchedAt,
    DELIVERED: deliveredAt,
  };

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
        <span className="material-symbols-outlined text-red-500 text-xl">cancel</span>
        <div>
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">
            Order {status === OrderStatus.REFUNDED ? "Refunded" : "Cancelled"}
          </p>
          {cancelledAt && (
            <p className="text-xs text-red-500 dark:text-red-500 mt-0.5">
              {formatDate(cancelledAt)}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {STEPS.map((step, index) => {
        const stepIndex = STATUS_ORDER[step.key];
        const isDone = currentStep > stepIndex;
        const isCurrent = currentStep === stepIndex;
        const isLast = index === STEPS.length - 1;
        const timestamp = timestamps[step.key];

        return (
          <div key={step.key} className="flex items-start gap-3">
            {/* Icon + connector */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors",
                  isDone
                    ? "bg-primary border-primary"
                    : isCurrent
                    ? "bg-primary/10 border-primary"
                    : "bg-slate-100 border-slate-200 dark:bg-slate-700 dark:border-slate-600"
                )}
              >
                <span
                  className={cn(
                    "material-symbols-outlined text-base",
                    isDone
                      ? "text-white"
                      : isCurrent
                      ? "text-primary"
                      : "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {isDone ? "check" : step.icon}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 h-8 mt-1",
                    isDone ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"
                  )}
                />
              )}
            </div>

            {/* Label */}
            <div className="pt-1.5 pb-6">
              <p
                className={cn(
                  "text-sm font-semibold",
                  isCurrent
                    ? "text-primary"
                    : isDone
                    ? "text-slate-700 dark:text-slate-200"
                    : "text-slate-400 dark:text-slate-500"
                )}
              >
                {step.label}
              </p>
              {timestamp && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {formatDate(timestamp)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
