import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  variant: "product" | "order" | "chat" | "notification" | "farmer" | "stat";
  count?: number;
  className?: string;
}

function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-pulse">
      <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-1/3" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-1/4" />
        </div>
      </div>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-2/3" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2" />
        </div>
        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-1/3" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-2/3" />
      </div>
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-10" />
    </div>
  );
}

function NotificationSkeleton() {
  return (
    <div className="flex items-start gap-3 p-4 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-1/4" />
      </div>
    </div>
  );
}

function FarmerSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-pulse">
      <div className="h-28 bg-slate-200 dark:bg-slate-700" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-1/3" />
        <div className="flex gap-1 pt-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-slate-200 dark:bg-slate-700 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
      <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2 mb-1" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-2/3" />
    </div>
  );
}

const variantMap = {
  product: ProductSkeleton,
  order: OrderSkeleton,
  chat: ChatSkeleton,
  notification: NotificationSkeleton,
  farmer: FarmerSkeleton,
  stat: StatSkeleton,
};

export function SkeletonCard({ variant, count = 1, className }: SkeletonCardProps) {
  const Component = variantMap[variant];
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={cn(className)}>
          <Component />
        </div>
      ))}
    </>
  );
}
