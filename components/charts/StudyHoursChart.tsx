"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ProgressChartPoint } from "@/lib/types";

interface StudyHoursChartProps {
  data: ProgressChartPoint[];
}

export function StudyHoursChart({ data }: StudyHoursChartProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Knowledge Deep Work
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Daily dedicated hours of technical study & deliberate practice
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
          Daily Goal: 3.5h
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}h`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload as ProgressChartPoint;
                  return (
                    <div className="rounded-xl border border-purple-500/30 bg-[#090d1a] p-3 shadow-xl text-xs">
                      <p className="font-bold text-white">{pt.fullDate || pt.day}</p>
                      <p className="text-purple-400 font-semibold mt-1">
                        Deep Study: {pt.studyHours} hours
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="studyHours"
              fill="#8b5cf6"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
