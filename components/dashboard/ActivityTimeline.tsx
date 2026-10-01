"use client";

import type { TimelineActivity } from "@/lib/types";
import { CATEGORIES } from "@/lib/const";
import { CheckCircle2 } from "lucide-react";

interface ActivityTimelineProps {
  activities: TimelineActivity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Chronological Activity Log
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Daily execution history and timestamps
          </p>
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-purple-500/50 before:via-sky-500/30 before:to-slate-800">
        {activities.map((act) => {
          const cat = CATEGORIES.find((c) => c.id === act.categoryId) || CATEGORIES[0];
          return (
            <div
              key={act.id}
              data-animate="timeline-item"
              className="relative flex items-start justify-between gap-4 group"
            >
              {/* Timeline Node Bullet */}
              <div
                className="absolute -left-6 top-1 h-5 w-5 rounded-full border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: "#0d1222",
                  boxShadow: `0 0 10px ${cat.glowColor}`,
                }}
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-purple-300">
                    {act.time}
                  </span>
                  <span
                    className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: `${cat.color}30`,
                      color: cat.color,
                      backgroundColor: `${cat.color}10`,
                    }}
                  >
                    {cat.name}
                  </span>
                </div>

                <h4 className="mt-1 text-sm font-semibold text-white tracking-tight">
                  {act.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">{act.detail}</p>
              </div>

              {act.completed && (
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Logged</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
