"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { CATEGORIES, type CategoryId } from "@/lib/const";
import type { DailyEntry } from "@/lib/types";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QuickAddModal } from "@/components/forms/QuickAddModal";

interface CategoryDetailViewProps {
  categoryId: CategoryId;
  entry: DailyEntry;
}

export function CategoryDetailView({
  categoryId,
  entry,
}: CategoryDetailViewProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const config = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];

  // Derive category specific details
  let progress = 75;
  let status = "In Progress";
  let specificContent: React.ReactNode = null;

  if (categoryId === "communication") {
    const c = entry.communication;
    progress = c.completed ? 100 : 75;
    status = c.completed ? "Completed" : "In Progress";
    specificContent = (
      <div className="space-y-4">
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <h4 className="text-sm font-bold text-white mb-2">Today's Practice Session</h4>
          <p className="text-sm text-slate-300 font-medium">{c.activity}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.skills.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <h4 className="text-sm font-bold text-white mb-2">Vocabulary Acquired</h4>
          <div className="flex flex-wrap gap-2">
            {c.vocabLearned.map((v) => (
              <span
                key={v}
                className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {c.notes && (
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <h4 className="text-sm font-bold text-white mb-1">Debrief & Notes</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{c.notes}</p>
          </div>
        )}
      </div>
    );
  } else if (categoryId === "expense") {
    const exp = entry.expense;
    progress = Math.min(100, Math.round(((exp.budget - exp.dailyTotal) / exp.budget) * 100));
    status = exp.dailyTotal <= exp.budget ? "Controlled" : "Exceeded";
    specificContent = (
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Today's Spend</span>
            <p className="text-xl font-bold text-amber-400 font-mono mt-1">₹{exp.dailyTotal}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Monthly Total</span>
            <p className="text-xl font-bold text-white font-mono mt-1">₹{exp.monthlyTotal}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Monthly Budget</span>
            <p className="text-xl font-bold text-slate-300 font-mono mt-1">₹{exp.budget}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Remaining</span>
            <p className="text-xl font-bold text-emerald-400 font-mono mt-1">₹{exp.remainingBudget}</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <h4 className="text-sm font-bold text-white mb-3">Logged Items Today</h4>
          <div className="space-y-2">
            {exp.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-slate-900/50 text-xs"
              >
                <div>
                  <p className="font-semibold text-white">{item.description}</p>
                  <p className="text-slate-400 text-[11px]">{item.category} • {item.paymentMethod}</p>
                </div>
                <span className="font-mono font-bold text-amber-400">₹{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (categoryId === "food") {
    const f = entry.food;
    progress = 80;
    status = "In Progress";
    specificContent = (
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Breakfast", done: f.breakfast },
            { label: "Lunch", done: f.lunch },
            { label: "Dinner", done: f.dinner },
            { label: "Fruits & Veggies", done: f.fruitsVeggies },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 ${
                item.done
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-white/5 bg-white/[0.02] text-slate-400"
              }`}
            >
              <CheckCircle2 className={`h-6 w-6 ${item.done ? "text-emerald-400" : "text-slate-600"}`} />
              <span className="text-xs font-semibold">{item.label}</span>
              <span className="text-[10px] font-mono uppercase">{item.done ? "Completed" : "Pending"}</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Daily Hydration Target</h4>
            <p className="text-xs text-slate-400 mt-0.5">Recommended minimum: 3.0 Liters</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black font-mono text-sky-400">{f.waterLiters}L</span>
            <p className="text-[11px] text-slate-400">Logged today</p>
          </div>
        </div>

        {f.notes && (
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <h4 className="text-sm font-bold text-white mb-1">Nutrition Notes</h4>
            <p className="text-xs text-slate-300">{f.notes}</p>
          </div>
        )}
      </div>
    );
  } else if (categoryId === "skincare") {
    const s = entry.skincare;
    progress = 75;
    status = "In Progress";
    specificContent = (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`p-4 rounded-xl border ${s.morningRoutine ? "border-pink-500/30 bg-pink-500/10 text-pink-300" : "border-white/5 bg-white/[0.02] text-slate-400"}`}>
            <h5 className="text-xs font-bold uppercase mb-1">Morning Routine</h5>
            <p className="text-sm font-semibold">{s.morningRoutine ? "Completed" : "Pending"}</p>
          </div>
          <div className={`p-4 rounded-xl border ${s.sunscreen ? "border-pink-500/30 bg-pink-500/10 text-pink-300" : "border-white/5 bg-white/[0.02] text-slate-400"}`}>
            <h5 className="text-xs font-bold uppercase mb-1">Sunscreen (SPF 50)</h5>
            <p className="text-sm font-semibold">{s.sunscreen ? "Applied" : "Pending"}</p>
          </div>
          <div className={`p-4 rounded-xl border ${s.nightRoutine ? "border-pink-500/30 bg-pink-500/10 text-pink-300" : "border-white/5 bg-white/[0.02] text-slate-400"}`}>
            <h5 className="text-xs font-bold uppercase mb-1">Night Protocol</h5>
            <p className="text-sm font-semibold">{s.nightRoutine ? "Completed" : "Scheduled (10 PM)"}</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Sleep Restoration</h4>
            <p className="text-xs text-slate-400 mt-0.5">Deep sleep & recovery</p>
          </div>
          <span className="text-xl font-bold font-mono text-purple-300">{s.sleepHours} hours</span>
        </div>

        {s.notes && (
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <h4 className="text-sm font-bold text-white mb-1">Grooming Notes</h4>
            <p className="text-xs text-slate-300">{s.notes}</p>
          </div>
        )}
      </div>
    );
  } else if (categoryId === "study") {
    const st = entry.study;
    progress = 70;
    status = "In Progress";
    specificContent = (
      <div className="space-y-4">
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-white">Today's Deep Work Topics</h4>
            <span className="text-xs font-mono font-bold text-purple-400">{Math.round(st.studyTimeMinutes / 60 * 10) / 10} hours</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {st.topics.map((top) => (
              <span key={top} className="text-xs px-3 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30">
                {top}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <h4 className="text-sm font-bold text-white mb-3">Topic Task Breakdown</h4>
          <div className="space-y-2">
            {st.tasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-slate-900/50 text-xs">
                <span className={`font-medium ${t.status === "completed" ? "text-slate-400 line-through" : "text-white"}`}>
                  {t.title}
                </span>
                <Badge variant={t.status === "completed" ? "emerald" : "amber"} size="sm">
                  {t.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {st.notes && (
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <h4 className="text-sm font-bold text-white mb-1">Session Debrief</h4>
            <p className="text-xs text-slate-300">{st.notes}</p>
          </div>
        )}
      </div>
    );
  } else if (categoryId === "workout") {
    const w = entry.workout;
    progress = w.completed ? 100 : 0;
    status = w.completed ? "Completed" : "Pending";
    specificContent = (
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Routine Type</span>
            <p className="text-base font-bold text-red-400 mt-1">{w.type}</p>
          </div>
          <div className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Duration</span>
            <p className="text-base font-bold text-white font-mono mt-1">{w.durationMinutes} min</p>
          </div>
          <div className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Burned</span>
            <p className="text-base font-bold text-amber-400 font-mono mt-1">{w.caloriesBurned || 320} kcal</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <h4 className="text-sm font-bold text-white mb-3">Exercises Executed</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {w.exercises.map((ex, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-white/5 bg-slate-900/50 text-xs flex justify-between items-center">
                <span className="font-semibold text-white">{ex.name}</span>
                <span className="font-mono text-purple-300">{ex.sets} sets × {ex.reps} reps {ex.weightKg ? `(${ex.weightKg}kg)` : ""}</span>
              </div>
            ))}
          </div>
        </div>

        {w.notes && (
          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
            <h4 className="text-sm font-bold text-white mb-1">Physical Feedback</h4>
            <p className="text-xs text-slate-300">{w.notes}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white tracking-tight">
                {config.name} Sector
              </h2>
              <Badge variant="purple" size="sm">
                Active Protocol
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{config.tagline}</p>
          </div>
        </div>

        <Button
          size="sm"
          variant="primary"
          glow
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Record {config.name} Entry</span>
        </Button>
      </div>

      {/* Top Banner Card */}
      <div
        className="rounded-2xl border p-6 backdrop-blur-md relative overflow-hidden"
        style={{
          backgroundColor: "#0d1222",
          borderColor: `${config.color}30`,
          boxShadow: `0 0 30px ${config.glowColor}`,
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Sector Health & Rate
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {progress}% Ascension Velocity
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Status is {status}. Continued consistency in this sector compounds overall rank advancement.
            </p>
          </div>

          <ProgressRing
            progress={progress}
            size={130}
            strokeWidth={10}
            color={config.color}
            glowColor={config.glowColor}
          />
        </div>
      </div>

      {/* Specific Category Content */}
      <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-6">
        {specificContent}
      </div>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        initialCategory={categoryId}
      />
    </div>
  );
}
