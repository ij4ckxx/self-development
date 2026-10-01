import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  glow?: boolean;
}

const VARIANT_MAP = {
  primary:
    "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border border-purple-400/30 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]",
  secondary:
    "bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20",
  outline:
    "bg-transparent text-slate-300 border border-slate-700 hover:border-purple-500/60 hover:text-white hover:bg-purple-500/10",
  ghost:
    "bg-transparent text-slate-400 hover:text-slate-100 hover:bg-white/5",
  danger:
    "bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25 hover:border-red-500/50",
};

const SIZE_MAP = {
  sm: "px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm font-medium rounded-lg gap-2",
  lg: "px-5 py-2.5 text-base font-semibold rounded-xl gap-2.5",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  glow = false,
  disabled,
  ...rest
}: ButtonProps) {
  const variantClass = VARIANT_MAP[variant];
  const sizeClass = SIZE_MAP[size];
  const glowClass = glow ? "shadow-[0_0_20px_rgba(168,85,247,0.4)]" : "";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer active:scale-[0.98]";

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center transition-all duration-150 select-none ${variantClass} ${sizeClass} ${glowClass} ${disabledClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
