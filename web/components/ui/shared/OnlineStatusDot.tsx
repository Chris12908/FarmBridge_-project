import { cn } from "@/lib/utils";

interface OnlineStatusDotProps {
  isOnline: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function OnlineStatusDot({ isOnline, size = "sm", className }: OnlineStatusDotProps) {
  return (
    <span
      className={cn(
        "rounded-full border-2 border-white dark:border-slate-800 inline-block shrink-0",
        size === "sm" ? "w-2.5 h-2.5" : "w-3.5 h-3.5",
        isOnline ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600",
        className
      )}
      title={isOnline ? "Online" : "Offline"}
    />
  );
}
