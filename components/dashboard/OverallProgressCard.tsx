"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, Clock, Flame, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Badge } from "@/components/ui/Badge";
import { animatePulseGlow } from "@/lib/utils/gsapAnimations";

interface OverallProgressCardProps {
  progress: number;
  completedTasks: number;
  pendingTasks: number;
  streakDays: number;
  selectedDate?: string;
}

export function OverallProgressCard({
  progress,
  completedTasks,
  pendingTasks,
  streakDays,
  selectedDate = "2026-10-01",
}: OverallProgressCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const tween = animatePulseGlow(cardRef.current);
      return () => {
        tween?.kill();
      };
    }
  }, []);

  return (
    <div
      ref={cardRef}
      data-animate="hero-card"
      className="relative overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-br from-[#12172f] via-[#0d1224] to-[#080b16] p-6 lg:p-8 shadow-[0_0_35px_rgba(168,85,247,0.15)] transition-all"
    >
      {/* Background cyber radial glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Progress info and status */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <Badge variant="purple" dot size="sm">
              Progression Metric
            </Badge>
            <span className="text-xs font-mono text-purple-300/80 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              System Core
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
            Daily Ascension Index
            <TrendingUp className="h-6 w-6 text-purple-400" />
          </h2>
          <p className="mt-1 text-sm text-slate-300 max-w-md">
            Calculated across all 6 core categories. Consistent daily execution activates tier advancement.
          </p>

          {/* Quick Metrics Badges */}
          <div className="mt-5 grid grid-cols-3 gap-3 max-w-sm mx-auto md:mx-0">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="text-[11px] font-semibold uppercase tracking-wider">Done</span>
              </div>
              <p className="text-lg font-bold text-white font-mono">{completedTasks}</p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-[11px] font-semibold uppercase tracking-wider">Pending</span>
              </div>
              <p className="text-lg font-bold text-white font-mono">{pendingTasks}</p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-rose-400 mb-1">
                <Flame className="h-3.5 w-3.5" />
                <span className="text-[11px] font-semibold uppercase tracking-wider">Streak</span>
              </div>
              <p className="text-lg font-bold text-white font-mono">{streakDays}d</p>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Progress Ring */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <ProgressRing
            progress={progress}
            size={160}
            strokeWidth={12}
            color="#a855f7"
            glowColor="rgba(168, 85, 247, 0.6)"
            sublabel="Overall Score"
          />
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-purple-300">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>Tier Status: High Velocity</span>
          </div>
        </div>
      </div>
    </div>
  );
}
