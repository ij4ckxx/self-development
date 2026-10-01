"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { generateCalendarDays } from "@/lib/utils/dateUtils";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function CalendarView() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // 9 = October (0-indexed)

  const days = generateCalendarDays(currentYear, currentMonthIndex);

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonthIndex((m) => m + 1);
    }
  };

  // Mock score generator based on day
  const getDayScore = (dateStr: string) => {
    if (dateStr === "2026-10-01") return 72;
    if (dateStr === "2026-09-30") return 84;
    if (dateStr === "2026-09-29") return 68;
    const dayNum = parseInt(dateStr.split("-")[2], 10) || 1;
    return Math.min(100, Math.max(35, Math.floor(Math.sin(dayNum * 0.7) * 30 + 68)));
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Chronological Archive
            <CalendarIcon className="h-5 w-5 text-purple-400" />
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Explore daily historical progression logs and habit completion records
          </p>
        </div>

        {/* Month Switcher */}
        <div className="inline-flex items-center gap-2 rounded-xl bg-[#0d1222] p-1.5 border border-white/8 backdrop-blur-md">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-3 text-sm font-bold text-white min-w-[130px] text-center font-mono">
            {MONTH_NAMES[currentMonthIndex]} {currentYear}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid Card */}
      <div className="rounded-2xl border border-white/8 bg-[#0d1222]/85 backdrop-blur-md p-6">
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
            <div
              key={dayName}
              className="text-center text-xs font-mono font-bold text-slate-400 uppercase pb-2"
            >
              {dayName}
            </div>
          ))}

          {days.map((item, idx) => {
            const score = getDayScore(item.date);
            const isToday = item.date === "2026-10-01";

            return (
              <Link
                key={idx}
                href={`/dashboard/date/${item.date}`}
                className={`group relative flex flex-col justify-between p-3 rounded-xl border transition-all duration-200 min-h-[90px] ${
                  isToday
                    ? "border-purple-500/60 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                    : item.isCurrentMonth
                    ? "border-white/5 bg-white/[0.02] hover:border-purple-500/30 hover:bg-white/[0.05]"
                    : "border-transparent opacity-30 hover:opacity-70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isToday ? "text-purple-300" : "text-slate-300"
                    }`}
                  >
                    {item.dayNumber}
                  </span>
                  {isToday && (
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                  )}
                </div>

                <div className="mt-2">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-slate-400">Score</span>
                    <span
                      className={`font-bold ${
                        score >= 80
                          ? "text-emerald-400"
                          : score >= 60
                          ? "text-purple-300"
                          : "text-amber-400"
                      }`}
                    >
                      {score}%
                    </span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        score >= 80
                          ? "bg-emerald-400"
                          : score >= 60
                          ? "bg-purple-500"
                          : "bg-amber-400"
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>

                <div className="mt-1 flex items-center justify-end text-[10px] text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Log</span>
                  <ArrowRight className="h-2.5 w-2.5 ml-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
