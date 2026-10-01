"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { formatShortDate, getAdjacentDate } from "@/lib/utils/dateUtils";

interface DateSelectorProps {
  currentDate: string;
  onDateChange: (newDate: string) => void;
  className?: string;
}

export function DateSelector({
  currentDate,
  onDateChange,
  className = "",
}: DateSelectorProps) {
  const isToday = currentDate === "2026-10-01";

  const handlePrev = () => {
    onDateChange(getAdjacentDate(currentDate, -1));
  };

  const handleNext = () => {
    onDateChange(getAdjacentDate(currentDate, 1));
  };

  const handleSetToday = () => {
    onDateChange("2026-10-01");
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-xl bg-[#090d1a] p-1 border border-white/8 backdrop-blur-md ${className}`}
    >
      <button
        onClick={handlePrev}
        className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        aria-label="Previous day"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        onClick={handleSetToday}
        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
          isToday
            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
            : "text-slate-300 hover:bg-white/5"
        }`}
      >
        {isToday ? "Today, " : ""}
        {formatShortDate(currentDate)}
      </button>

      <button
        onClick={handleNext}
        className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        aria-label="Next day"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="h-4 w-px bg-white/10 mx-1" />

      <Link
        href="/dashboard/calendar"
        className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        title="Open Full Calendar"
      >
        <CalendarIcon className="h-3.5 w-3.5 text-purple-400" />
        <span className="hidden sm:inline">Calendar</span>
      </Link>
    </div>
  );
}
