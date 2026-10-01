"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ProgressChartPoint } from "@/lib/types";

interface WeeklyProgressChartProps {
  data: ProgressChartPoint[];
}

export function WeeklyProgressChart({ data }: WeeklyProgressChartProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Progress Trajectory
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Daily ascension percentage and velocity trend
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
          Target: 80%+
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis
              dataKey="day"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload as ProgressChartPoint;
                  return (
                    <div className="rounded-xl border border-purple-500/30 bg-[#090d1a] p-3 shadow-xl backdrop-blur-md text-xs">
                      <p className="font-bold text-white">{pt.fullDate || pt.day}</p>
                      <p className="text-purple-400 font-semibold mt-1">
                        Progress: {pt.progress}%
                      </p>
                      <p className="text-slate-400">
                        Study: {pt.studyHours}h • Spend: ₹{pt.expenses}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="progress"
              stroke="#a855f7"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#progressGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
