import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function EmptyState({
  title = "No activities recorded yet",
  description = "Your ascension journey starts today. Record your first accomplishment to activate the system.",
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-3 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
        {icon || <Sparkles className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-semibold text-white tracking-wide">{title}</h3>
      <p className="mt-1 text-sm text-slate-400 max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}
