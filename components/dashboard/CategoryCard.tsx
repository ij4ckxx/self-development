"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Wallet,
  Utensils,
  Sparkles,
  GraduationCap,
  Dumbbell,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { CATEGORIES } from "@/lib/const";
import type { CategorySummary } from "@/lib/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { animateCardHover } from "@/lib/utils/gsapAnimations";

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare,
  Wallet,
  Utensils,
  Sparkles,
  GraduationCap,
  Dumbbell,
};

interface CategoryCardProps {
  category: CategorySummary;
  selectedDate?: string;
  onQuickLog?: (categoryId: string) => void;
}

export function CategoryCard({
  category,
  selectedDate = "2026-10-01",
  onQuickLog,
}: CategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const config = CATEGORIES.find((c) => c.id === category.id) || CATEGORIES[0];
  const Icon = ICON_MAP[config.iconName] || GraduationCap;

  const isCompleted = category.status === "Completed" || category.completionPercentage === 100;

  const handleMouseEnter = () => animateCardHover(cardRef.current, true);
  const handleMouseLeave = () => animateCardHover(cardRef.current, false);

  return (
    <div
      ref={cardRef}
      data-animate="category-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-[#0d1222]/90 backdrop-blur-md p-5 transition-colors duration-200 border-white/8 ${config.borderGlow}`}
    >
      {/* Background Subtle Ambient Aura */}
      <div
        className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl ${config.accentGradient} blur-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`}
      />

      <div>
        {/* Card Header: Icon + Category Name + Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 shadow-sm"
              style={{
                backgroundColor: `${config.color}15`,
                color: config.color,
                boxShadow: `0 0 15px ${config.glowColor}`,
              }}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {category.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {config.tagline}
              </p>
            </div>
          </div>

          <Badge
            variant={
              isCompleted
                ? "emerald"
                : category.status === "In Progress"
                ? "purple"
                : "neutral"
            }
            size="sm"
            dot={!isCompleted}
          >
            {category.status}
          </Badge>
        </div>

        {/* Short Summary Description */}
        <div className="my-3 rounded-xl bg-white/[0.02] border border-white/5 p-2.5">
          <p className="text-xs text-slate-300 font-medium line-clamp-1">
            {category.shortSummary}
          </p>
        </div>
      </div>

      {/* Progress & Quick Actions */}
      <div className="mt-2 pt-3 border-t border-white/5">
        <div className="flex items-center justify-between text-xs mb-2 font-mono">
          <span className="text-slate-400 font-medium">Ascension Rate</span>
          <span className="font-bold text-white flex items-center gap-1">
            {category.completionPercentage}%
            {isCompleted && (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            )}
          </span>
        </div>

        <ProgressBar
          progress={category.completionPercentage}
          color={
            category.id === "workout"
              ? "from-red-500 to-rose-400"
              : category.id === "study"
              ? "from-purple-500 to-indigo-400"
              : category.id === "communication"
              ? "from-sky-500 to-cyan-400"
              : category.id === "expense"
              ? "from-amber-500 to-yellow-400"
              : category.id === "food"
              ? "from-emerald-500 to-teal-400"
              : "from-pink-500 to-rose-400"
          }
          height="h-2"
        />

        <div className="mt-4 flex items-center justify-between gap-2">
          {onQuickLog ? (
            <button
              onClick={() => onQuickLog(category.id)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              + Quick Log
            </button>
          ) : (
            <div />
          )}

          <Link
            href={`/dashboard/category/${category.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors group/link"
          >
            <span>View Protocol</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
