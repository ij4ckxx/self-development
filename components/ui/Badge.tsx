import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "purple" | "cyan" | "emerald" | "amber" | "rose" | "neutral";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

const BADGE_VARIANTS = {
  purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  cyan: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  rose: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  neutral: "bg-slate-800/80 text-slate-300 border-slate-700/60",
};

const DOT_COLORS = {
  purple: "bg-purple-400",
  cyan: "bg-sky-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  neutral: "bg-slate-400",
};

export function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className = "",
  dot = false,
}: BadgeProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs font-semibold";
  const colorClass = BADGE_VARIANTS[variant];
  const dotColor = DOT_COLORS[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wide uppercase ${colorClass} ${sizeClass} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${dotColor}`} />}
      {children}
    </span>
  );
}
