"use client";

import { useEffect, useRef } from "react";
import { BookOpen, Dumbbell, Wallet, CheckSquare, ArrowUpRight } from "lucide-react";
import { animateCounter } from "@/lib/utils/gsapAnimations";
import Link from "next/link";

interface SummaryStatsCardsProps {
  studyHours: number;
  workoutCompleted: boolean;
  expensesToday: number;
  completedTasks: number;
  pendingTasks: number;
}

export function SummaryStatsCards({
  studyHours,
  workoutCompleted,
  expensesToday,
  completedTasks,
  pendingTasks,
}: SummaryStatsCardsProps) {
  const studyRef = useRef<HTMLSpanElement>(null);
  const expenseRef = useRef<HTMLSpanElement>(null);
  const tasksRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    animateCounter(studyRef.current, Math.round(studyHours * 10) / 10, 1.2, "h");
    animateCounter(expenseRef.current, expensesToday, 1.2, "");
    animateCounter(tasksRef.current, completedTasks, 1, "");
  }, [studyHours, expensesToday, completedTasks]);

  const cards = [
    {
      title: "Study Focus",
      valueRef: studyRef,
      fallbackValue: `${studyHours}h`,
      subtitle: "Target: 3.5 hrs",
      icon: BookOpen,
      iconColor: "text-purple-400",
      bgGlow: "from-purple-500/10 to-transparent",
      borderColor: "border-purple-500/20 hover:border-purple-500/40",
      href: "/dashboard/category/study",
    },
    {
      title: "Workout Protocol",
      value: workoutCompleted ? "Completed" : "Pending",
      subtitle: workoutCompleted ? "Upper Body (48 min)" : "Scheduled today",
      icon: Dumbbell,
      iconColor: "text-red-400",
      bgGlow: "from-red-500/10 to-transparent",
      borderColor: "border-red-500/20 hover:border-red-500/40",
      href: "/dashboard/category/workout",
    },
    {
      title: "Today's Expense",
      valueRef: expenseRef,
      prefix: "₹",
      fallbackValue: `₹${expensesToday}`,
      subtitle: "Daily Budget: ₹1,000",
      icon: Wallet,
      iconColor: "text-amber-400",
      bgGlow: "from-amber-500/10 to-transparent",
      borderColor: "border-amber-500/20 hover:border-amber-500/40",
      href: "/dashboard/category/expense",
    },
    {
      title: "Tasks & Habits",
      valueRef: tasksRef,
      fallbackValue: `${completedTasks}`,
      suffix: ` / ${completedTasks + pendingTasks}`,
      subtitle: `${pendingTasks} remaining today`,
      icon: CheckSquare,
      iconColor: "text-emerald-400",
      bgGlow: "from-emerald-500/10 to-transparent",
      borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
      href: "/dashboard/date/2026-10-01",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Link
            key={idx}
            href={card.href}
            data-animate="summary-card"
            className={`group relative overflow-hidden rounded-xl border bg-[#0d1222]/80 backdrop-blur-md p-5 transition-all duration-200 hover:-translate-y-0.5 ${card.borderColor}`}
          >
            {/* Ambient subtle corner glow */}
            <div
              className={`absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl ${card.bgGlow} blur-2xl pointer-events-none`}
            />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="rounded-lg bg-white/[0.04] p-2">
                  <Icon className={`h-4 w-4 ${card.iconColor}`} />
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-baseline gap-1">
              {card.prefix && (
                <span className="text-lg font-bold text-slate-300 font-mono">
                  {card.prefix}
                </span>
              )}
              {card.valueRef ? (
                <span
                  ref={card.valueRef}
                  className="text-2xl font-black text-white font-mono tracking-tight"
                >
                  {card.fallbackValue}
                </span>
              ) : (
                <span className="text-2xl font-black text-white font-mono tracking-tight">
                  {card.value}
                </span>
              )}
              {card.suffix && (
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  {card.suffix}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-slate-400 font-medium truncate">
              {card.subtitle}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
