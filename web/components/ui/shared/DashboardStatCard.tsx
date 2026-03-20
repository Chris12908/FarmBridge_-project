import { cn } from "@/lib/utils";

interface DashboardStatCardProps {
  value: string | number;
  label: string;
  trend?: { value: string; positive: boolean };
  icon?: string;
  urgent?: boolean;
  className?: string;
}

export function DashboardStatCard({
  value,
  label,
  trend,
  icon,
  urgent = false,
  className,
}: DashboardStatCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-800 rounded-2xl border shadow-sm p-4 flex flex-col gap-2",
        urgent
          ? "border-red-200 dark:border-red-900"
          : "border-primary/10 dark:border-slate-700",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              urgent ? "bg-red-50 dark:bg-red-900/30" : "bg-primary/10 dark:bg-primary/20"
            )}
          >
            <span
              className={cn(
                "material-symbols-outlined text-xl",
                urgent ? "text-red-500" : "text-primary"
              )}
            >
              {icon}
            </span>
          </div>
        )}
        {trend && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full",
              trend.positive
                ? "text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-900/30"
                : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30"
            )}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
          {value}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
