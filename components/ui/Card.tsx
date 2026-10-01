import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: "purple" | "cyan" | "emerald" | "amber" | "rose" | "none";
  interactive?: boolean;
  onClick?: () => void;
  id?: string;
}

const GLOW_MAP = {
  purple: "hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
  cyan: "hover:border-sky-500/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]",
  emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
  amber: "hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]",
  rose: "hover:border-rose-500/40 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]",
  none: "",
};

export function Card({
  children,
  className = "",
  glow = "none",
  interactive = false,
  onClick,
  id,
}: CardProps) {
  const glowClass = GLOW_MAP[glow] || "";
  const interactiveClass = interactive
    ? "cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
    : "";

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative rounded-xl border border-white/8 bg-[#0d1222]/85 backdrop-blur-md p-5 text-slate-100 ${glowClass} ${interactiveClass} ${className}`}
    >
      {children}
    </div>
  );
}
