"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { CategorySummary } from "@/lib/types";

interface CategoryDistributionChartProps {
  categories: CategorySummary[];
}

export function CategoryDistributionChart({
  categories,
}: CategoryDistributionChartProps) {
  const radarData = categories.map((cat) => ({
    subject: cat.name,
    score: cat.completionPercentage,
    fullMark: 100,
  }));

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Sovereign Stat Hexagon
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Equilibrium across core developmental pillars
          </p>
        </div>
      </div>

      <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
            <PolarAngleAxis
              dataKey="subject"
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              stroke="#475569"
              fontSize={9}
              tick={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-sky-500/30 bg-[#090d1a] p-2.5 shadow-xl text-xs">
                      <p className="font-bold text-white">{data.subject}</p>
                      <p className="text-sky-400 font-semibold mt-0.5">
                        Ascension: {data.score}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Radar
              name="Sector Completion"
              dataKey="score"
              stroke="#38bdf8"
              fill="#38bdf8"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
