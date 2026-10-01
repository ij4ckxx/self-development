"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Wallet,
  Utensils,
  Sparkles,
  GraduationCap,
  Dumbbell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatFriendlyDate, getAdjacentDate } from "@/lib/utils/dateUtils";
import type { DailyEntry } from "@/lib/types";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/lib/const";

interface DailyDateViewProps {
  entry: DailyEntry;
}

export function DailyDateView({ entry }: DailyDateViewProps) {
  const [currentEntry, setCurrentEntry] = useState<DailyEntry>(entry);
  const formattedDate = formatFriendlyDate(currentEntry.date);
  const prevDate = getAdjacentDate(currentEntry.date, -1);
  const nextDate = getAdjacentDate(currentEntry.date, 1);

  return (
    <div className="space-y-6">
      {/* Date Header & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              {formattedDate}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Comprehensive daily execution report & journal
            </p>
          </div>
        </div>

        {/* Previous / Next Day navigation */}
        <div className="inline-flex items-center gap-2 rounded-xl bg-[#0d1222] p-1.5 border border-white/8 backdrop-blur-md">
          <Link
            href={`/dashboard/date/${prevDate}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <span className="px-3 text-xs font-mono font-bold text-slate-300">
            {currentEntry.date}
          </span>
          <Link
            href={`/dashboard/date/${nextDate}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Next Day"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Top Level Summary Banner */}
      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-[#12172f] via-[#0d1222] to-[#080b16] p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Badge variant="purple" size="sm" dot>
              Daily Ascension Report
            </Badge>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              Score: {currentEntry.overallProgress}% Complete
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              {currentEntry.completedTasksCount} core objectives executed,{" "}
              {currentEntry.pendingTasksCount} pending items remaining.
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono">
              <span className="text-emerald-400">
                ✓ {currentEntry.completedTasksCount} Done
              </span>
              <span className="text-amber-400">
                ○ {currentEntry.pendingTasksCount} Pending
              </span>
              <span className="text-purple-300">
                🔥 {currentEntry.streakDays} Days Streak
              </span>
            </div>
          </div>

          <ProgressRing
            progress={currentEntry.overallProgress}
            size={120}
            strokeWidth={10}
            color="#a855f7"
          />
        </div>
      </div>

      {/* Daily Journal / General Notes (Section 52) */}
      {currentEntry.dailyNote && (
        <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-5">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <BookOpen className="h-4 w-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Daily Reflection Journal
            </h4>
          </div>
          <p className="text-sm text-slate-300 italic leading-relaxed">
            "{currentEntry.dailyNote}"
          </p>
        </div>
      )}

      {/* All Six Sectors Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Study & Goals */}
        <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-purple-400">
              <GraduationCap className="h-5 w-5" />
              <h4 className="font-bold text-white text-sm">Study & Goals</h4>
            </div>
            <span className="text-xs font-mono text-purple-300 font-semibold">
              {Math.round((currentEntry.study.studyTimeMinutes / 60) * 10) / 10}h Focus
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {currentEntry.study.tasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <span
                  className={
                    t.status === "completed"
                      ? "text-slate-400 line-through"
                      : "text-white"
                  }
                >
                  {t.title}
                </span>
                <Badge
                  variant={t.status === "completed" ? "emerald" : "amber"}
                  size="sm"
                >
                  {t.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Workout */}
        <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-red-400">
              <Dumbbell className="h-5 w-5" />
              <h4 className="font-bold text-white text-sm">Workout</h4>
            </div>
            <Badge
              variant={currentEntry.workout.completed ? "emerald" : "amber"}
              size="sm"
            >
              {currentEntry.workout.completed ? "Completed" : "Pending"}
            </Badge>
          </div>

          <p className="text-xs font-semibold text-white">
            {currentEntry.workout.type} ({currentEntry.workout.durationMinutes} min)
          </p>
          <div className="mt-2 space-y-1">
            {currentEntry.workout.exercises.map((ex, idx) => (
              <div
                key={idx}
                className="flex justify-between text-xs text-slate-300 py-1 border-b border-white/5 last:border-0"
              >
                <span>{ex.name}</span>
                <span className="font-mono text-slate-400">
                  {ex.sets}x{ex.reps} {ex.weightKg ? `(${ex.weightKg}kg)` : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Communication */}
        <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sky-400">
              <MessageSquare className="h-5 w-5" />
              <h4 className="font-bold text-white text-sm">Communication</h4>
            </div>
            <span className="text-xs font-mono text-sky-300 font-semibold">
              {currentEntry.communication.durationMinutes} min
            </span>
          </div>

          <p className="text-xs text-slate-300 font-medium">
            {currentEntry.communication.activity}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {currentEntry.communication.vocabLearned.map((v) => (
              <span
                key={v}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Expense */}
        <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Wallet className="h-5 w-5" />
              <h4 className="font-bold text-white text-sm">Expense Outflow</h4>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400">
              ₹{currentEntry.expense.dailyTotal} Spent
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            {currentEntry.expense.items.map((it) => (
              <div
                key={it.id}
                className="flex justify-between items-center py-1 border-b border-white/5 last:border-0"
              >
                <span className="text-slate-300">{it.description}</span>
                <span className="font-mono font-bold text-amber-400">₹{it.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Food Routine */}
        <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Utensils className="h-5 w-5" />
              <h4 className="font-bold text-white text-sm">Food Routine</h4>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              {currentEntry.food.waterLiters}L Water
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className={`p-2 rounded-lg border ${currentEntry.food.breakfast ? "border-emerald-500/30 text-emerald-300 bg-emerald-500/10" : "border-white/5 text-slate-500"}`}>
              Breakfast {currentEntry.food.breakfast ? "✓" : "○"}
            </div>
            <div className={`p-2 rounded-lg border ${currentEntry.food.lunch ? "border-emerald-500/30 text-emerald-300 bg-emerald-500/10" : "border-white/5 text-slate-500"}`}>
              Lunch {currentEntry.food.lunch ? "✓" : "○"}
            </div>
            <div className={`p-2 rounded-lg border ${currentEntry.food.dinner ? "border-emerald-500/30 text-emerald-300 bg-emerald-500/10" : "border-white/5 text-slate-500"}`}>
              Dinner {currentEntry.food.dinner ? "✓" : "○"}
            </div>
          </div>
        </div>

        {/* 6. Skin Care */}
        <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-pink-400">
              <Sparkles className="h-5 w-5" />
              <h4 className="font-bold text-white text-sm">Skin Care & Rest</h4>
            </div>
            <span className="text-xs font-mono text-pink-300 font-semibold">
              {currentEntry.skincare.sleepHours}h Sleep
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`p-2 rounded-lg border ${currentEntry.skincare.morningRoutine ? "border-pink-500/30 text-pink-300 bg-pink-500/10" : "border-white/5 text-slate-500"}`}>
              Morning Routine {currentEntry.skincare.morningRoutine ? "✓" : "○"}
            </div>
            <div className={`p-2 rounded-lg border ${currentEntry.skincare.nightRoutine ? "border-pink-500/30 text-pink-300 bg-pink-500/10" : "border-white/5 text-slate-500"}`}>
              Night Protocol {currentEntry.skincare.nightRoutine ? "✓" : "○"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
