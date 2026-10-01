interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  glow?: boolean;
  height?: string;
  className?: string;
}

export function ProgressBar({
  progress,
  color = "from-purple-500 to-indigo-500",
  glow = true,
  height = "h-2",
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-slate-800/80 p-[1px] border border-white/5 ${className}`}
    >
      <div
        className={`rounded-full bg-gradient-to-r ${color} ${height} transition-all duration-500 ease-out ${
          glow ? "shadow-[0_0_10px_rgba(168,85,247,0.5)]" : ""
        }`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
