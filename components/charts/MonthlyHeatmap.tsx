"use client";

import Link from "next/link";
import type { HeatmapDay } from "@/lib/types";

interface MonthlyHeatmapProps {
  days: HeatmapDay[];
}

const LEVEL_COLORS = {
  0: "bg-slate-800/40 border-white/5",
  1: "bg-purple-950/60 border-purple-800/40 text-purple-300",
  2: "bg-purple-800/60 border-purple-600/50 text-purple-200",
  3: "bg-purple-600/70 border-purple-400/60 text-white shadow-[0_0_8px_rgba(168,85,247,0.4)]",
  4: "bg-purple-500 border-purple-300 text-white shadow-[0_0_12px_rgba(168,85,247,0.7)]",
};

export function MonthlyHeatmap({ days }: MonthlyHeatmapProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Monthly Consistency Grid
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Visual activity frequency and daily discipline density
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
          <span>Less</span>
          <div className="h-3 w-3 rounded-sm bg-slate-800/40 border border-white/5" />
          <div className="h-3 w-3 rounded-sm bg-purple-950/60 border border-purple-800/40" />
          <div className="h-3 w-3 rounded-sm bg-purple-800/60 border border-purple-600/50" />
          <div className="h-3 w-3 rounded-sm bg-purple-600/70 border border-purple-400/60" />
          <div className="h-3 w-3 rounded-sm bg-purple-500 border border-purple-300" />
          <span>More</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <div
            key={dayName}
            className="text-center text-[10px] font-mono font-semibold text-slate-400 uppercase py-1"
          >
            {dayName}
          </div>
        ))}

        {days.map((day, idx) => (
          <Link
            key={idx}
            href={`/dashboard/date/${day.date}`}
            className={`group relative aspect-square rounded-lg border p-1 flex flex-col justify-between transition-all duration-150 hover:scale-105 hover:z-10 ${
              LEVEL_COLORS[day.level]
            }`}
          >
            <span className="text-[10px] font-mono font-bold">
              {day.date.split("-")[2]}
            </span>
            <span className="text-[9px] font-mono opacity-80 self-end">
              {day.progress}%
            </span>

            {/* Hover Tooltip */}
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex z-30 whitespace-nowrap rounded-lg bg-[#090d1a] border border-purple-500/40 px-2 py-1 text-[10px] text-white shadow-xl">
              {day.date}: {day.progress}% done ({day.tasksCount} tasks)
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
