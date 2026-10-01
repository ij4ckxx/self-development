"use client";

import { useEffect, useRef, useState } from "react";
import {
  getDashboardSummary,
  getProgressPoints,
  getHeatmapData,
} from "@/lib/services/dashboardService";
import type {
  DashboardSummary,
  HeatmapDay,
  ProgressChartPoint,
} from "@/lib/types";
import type { TimeRangeId } from "@/lib/const";
import { animatePageEntrance } from "@/lib/utils/gsapAnimations";
import { TimeRangeSelector } from "@/components/dashboard/TimeRangeSelector";
import { DateSelector } from "@/components/dashboard/DateSelector";
import { OverallProgressCard } from "@/components/dashboard/OverallProgressCard";
import { SummaryStatsCards } from "@/components/dashboard/SummaryStatsCards";
import { CategoryGrid } from "@/components/dashboard/CategoryGrid";
import { PendingTasksList } from "@/components/dashboard/PendingTasksList";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { GoalsSection } from "@/components/dashboard/GoalsSection";
import { WeeklyProgressChart } from "@/components/charts/WeeklyProgressChart";
import { CategoryDistributionChart } from "@/components/charts/CategoryDistributionChart";
import { ExpenseChart } from "@/components/charts/ExpenseChart";
import { StudyHoursChart } from "@/components/charts/StudyHoursChart";
import { MonthlyHeatmap } from "@/components/charts/MonthlyHeatmap";
import { QuickAddModal } from "@/components/forms/QuickAddModal";
import { MOCK_DASHBOARD_SUMMARY, MOCK_WEEKLY_CHART, MOCK_HEATMAP_DAYS } from "@/lib/mock/data";

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<TimeRangeId>("day");
  const [selectedDate, setSelectedDate] = useState("2026-10-01");
  const [summary, setSummary] = useState<DashboardSummary>(MOCK_DASHBOARD_SUMMARY);
  const [chartData, setChartData] = useState<ProgressChartPoint[]>(MOCK_WEEKLY_CHART);
  const [heatmapData, setHeatmapData] = useState<HeatmapDay[]>(MOCK_HEATMAP_DAYS);
  const [quickAddCategory, setQuickAddCategory] = useState<string | null>(null);

  // GSAP entrance animation on load
  useEffect(() => {
    const ctx = animatePageEntrance(containerRef.current);
    return () => {
      ctx?.revert();
    };
  }, []);

  // Update chart data when range changes
  useEffect(() => {
    let isMounted = true;
    getProgressPoints(range).then((pts) => {
      if (isMounted) setChartData(pts);
    });
    if (range === "month" || range === "year") {
      getHeatmapData().then((h) => {
        if (isMounted) setHeatmapData(h);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [range]);

  // Update summary when date changes
  useEffect(() => {
    let isMounted = true;
    getDashboardSummary(range, selectedDate).then((sum) => {
      if (isMounted) setSummary(sum);
    });
    return () => {
      isMounted = false;
    };
  }, [range, selectedDate]);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Top Filter Bar: Date & Range Selectors */}
      <div
        data-animate="header"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2"
      >
        <DateSelector
          currentDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        <TimeRangeSelector
          selectedRange={range}
          onChange={setRange}
        />
      </div>

      {/* 1. Overall Progress Hero Card */}
      <OverallProgressCard
        progress={summary.overallProgress}
        completedTasks={summary.completedTasksToday}
        pendingTasks={summary.pendingTasksToday}
        streakDays={summary.currentStreak}
        selectedDate={selectedDate}
      />

      {/* 2. Top Summary Stat Cards */}
      <SummaryStatsCards
        studyHours={summary.studyHoursToday}
        workoutCompleted={summary.workoutCompletedToday}
        expensesToday={summary.expensesToday}
        completedTasks={summary.completedTasksToday}
        pendingTasks={summary.pendingTasksToday}
      />

      {/* 3. Six Core Sector Cards */}
      <CategoryGrid
        categories={summary.categories}
        selectedDate={selectedDate}
        onQuickLog={(catId) => setQuickAddCategory(catId)}
      />

      {/* 4. Analytics & Charts Section */}
      <div data-animate="chart-card" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Tactical Performance Visualizers
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Data curves mapped across time range ({range.toUpperCase()})
            </p>
          </div>
        </div>

        {/* Primary Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WeeklyProgressChart data={chartData} />
          <CategoryDistributionChart categories={summary.categories} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <StudyHoursChart data={chartData} />
          <ExpenseChart data={chartData} />
        </div>

        {/* Monthly Heatmap (Displayed when Month or Year is selected, or on demand) */}
        {(range === "month" || range === "year") && (
          <MonthlyHeatmap days={heatmapData} />
        )}
      </div>

      {/* 5. Objectives & Daily Logs Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pending Tasks */}
        <PendingTasksList
          initialTasks={summary.pendingTasks}
          onTaskCompleted={(id) => {
            setSummary((prev) => ({
              ...prev,
              completedTasksToday: prev.completedTasksToday + 1,
              pendingTasksToday: Math.max(0, prev.pendingTasksToday - 1),
              overallProgress: Math.min(100, prev.overallProgress + 4),
            }));
          }}
        />

        {/* Chronological Timeline */}
        <ActivityTimeline activities={summary.timelineActivities} />
      </div>

      {/* 6. Active Campaign Goals */}
      <GoalsSection
        initialGoals={summary.goals}
        onToggleGoalTask={() => {
          setSummary((prev) => ({
            ...prev,
            overallProgress: Math.min(100, prev.overallProgress + 2),
          }));
        }}
      />

      {/* Quick Add Modal */}
      {quickAddCategory && (
        <QuickAddModal
          isOpen={!!quickAddCategory}
          onClose={() => setQuickAddCategory(null)}
          defaultDate={selectedDate}
          initialCategory={quickAddCategory as any}
        />
      )}
    </div>
  );
}
