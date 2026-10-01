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

interface ExpenseChartProps {
  data: ProgressChartPoint[];
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Financial Outflow
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Daily expense distribution and budget discipline
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Budget Cap: ₹1,000/d
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload as ProgressChartPoint;
                  return (
                    <div className="rounded-xl border border-amber-500/30 bg-[#090d1a] p-3 shadow-xl text-xs">
                      <p className="font-bold text-white">{pt.fullDate || pt.day}</p>
                      <p className="text-amber-400 font-semibold mt-1">
                        Spent: ₹{pt.expenses}
                      </p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {pt.expenses <= 1000 ? "✓ Within budget" : "⚠ Exceeded target"}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="expenses"
              fill="#f59e0b"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
