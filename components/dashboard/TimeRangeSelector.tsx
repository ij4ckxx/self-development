"use client";

import { TIME_RANGES, type TimeRangeId } from "@/lib/const";

interface TimeRangeSelectorProps {
  selectedRange: TimeRangeId;
  onChange: (range: TimeRangeId) => void;
  className?: string;
}

export function TimeRangeSelector({
  selectedRange,
  onChange,
  className = "",
}: TimeRangeSelectorProps) {
  return (
    <div
      className={`inline-flex items-center rounded-xl bg-[#090d1a] p-1 border border-white/8 backdrop-blur-md ${className}`}
      role="tablist"
      aria-label="Time range selector"
    >
      {TIME_RANGES.map((item) => {
        const isActive = selectedRange === item.id;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
