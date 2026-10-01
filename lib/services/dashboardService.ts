// Dashboard Service Layer (Plain functions, no classes)
// Ready to swap mock calls with fetch("NODE_BACKEND_URL/api/dashboard")

import {
  MOCK_DASHBOARD_SUMMARY,
  MOCK_HEATMAP_DAYS,
  MOCK_MONTHLY_CHART,
  MOCK_WEEKLY_CHART,
  MOCK_YEARLY_CHART,
} from "@/lib/mock/data";
import type { DashboardSummary, HeatmapDay, ProgressChartPoint } from "@/lib/types";
import type { TimeRangeId } from "@/lib/const";

export async function getDashboardSummary(
  range: TimeRangeId = "day",
  date?: string
): Promise<DashboardSummary> {
  // Simulate lightweight network resolution
  await new Promise((r) => setTimeout(r, 40));

  const summary = { ...MOCK_DASHBOARD_SUMMARY };
  if (date) {
    summary.selectedDate = date;
  }
  return summary;
}

export async function getProgressPoints(
  range: TimeRangeId = "week"
): Promise<ProgressChartPoint[]> {
  await new Promise((r) => setTimeout(r, 30));

  switch (range) {
    case "day":
    case "week":
      return MOCK_WEEKLY_CHART;
    case "month":
      return MOCK_MONTHLY_CHART;
    case "year":
      return MOCK_YEARLY_CHART;
    default:
      return MOCK_WEEKLY_CHART;
  }
}

export async function getHeatmapData(): Promise<HeatmapDay[]> {
  await new Promise((r) => setTimeout(r, 30));
  return MOCK_HEATMAP_DAYS;
}
