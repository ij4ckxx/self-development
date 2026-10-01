// Progress calculation algorithms (Plain functions, no classes)

import type { CategoryId } from "@/lib/const";
import type { DailyEntry } from "@/lib/types";

export function calculateCategoryProgress(
  categoryId: CategoryId,
  entry: DailyEntry
): number {
  if (!entry) return 0;

  switch (categoryId) {
    case "communication": {
      // Based on 30 min target and completion
      const comm = entry.communication;
      if (!comm) return 0;
      const timeScore = Math.min(100, Math.round((comm.durationMinutes / 30) * 80));
      const completionBonus = comm.completed ? 20 : 0;
      return Math.min(100, timeScore + completionBonus);
    }
    case "expense": {
      // Expense progress is financial discipline (staying within daily budget)
      const exp = entry.expense;
      if (!exp || exp.budget <= 0) return 100;
      if (exp.dailyTotal === 0) return 100;
      if (exp.dailyTotal <= exp.budget) {
        return Math.max(20, Math.round(((exp.budget - exp.dailyTotal) / exp.budget) * 100));
      }
      return Math.max(10, Math.round((exp.budget / exp.dailyTotal) * 50));
    }
    case "food": {
      const food = entry.food;
      if (!food) return 0;
      let count = 0;
      if (food.breakfast) count += 20;
      if (food.lunch) count += 25;
      if (food.dinner) count += 25;
      if (food.waterLiters >= 2.5) count += 15;
      if (food.fruitsVeggies) count += 15;
      return Math.min(100, count);
    }
    case "skincare": {
      const skin = entry.skincare;
      if (!skin) return 0;
      let count = 0;
      if (skin.morningRoutine) count += 40;
      if (skin.nightRoutine) count += 40;
      if (skin.sunscreen) count += 20;
      return Math.min(100, count);
    }
    case "study": {
      const study = entry.study;
      if (!study) return 0;
      // Target: 180 min (3h)
      const timePercent = Math.min(60, (study.studyTimeMinutes / 180) * 60);
      const tasks = study.tasks || [];
      const completedTasks = tasks.filter((t) => t.status === "completed").length;
      const taskPercent = tasks.length > 0 ? (completedTasks / tasks.length) * 40 : (study.completed ? 40 : 0);
      return Math.min(100, Math.round(timePercent + taskPercent));
    }
    case "workout": {
      const workout = entry.workout;
      if (!workout) return 0;
      if (!workout.completed) return 0;
      // Target: 45 min
      const dur = Math.min(100, Math.round((workout.durationMinutes / 45) * 100));
      return Math.max(50, Math.min(100, dur));
    }
    default:
      return 0;
  }
}

export function calculateDailyProgress(entry: DailyEntry): number {
  if (!entry) return 0;
  const categories: CategoryId[] = [
    "communication",
    "expense",
    "food",
    "skincare",
    "study",
    "workout",
  ];
  const scores = categories.map((cat) => calculateCategoryProgress(cat, entry));
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum / categories.length);
}

export function calculateWeeklyProgress(dailyScores: number[]): number {
  if (!dailyScores || dailyScores.length === 0) return 0;
  const sum = dailyScores.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / dailyScores.length);
}

export function calculateMonthlyProgress(dailyScores: number[]): number {
  if (!dailyScores || dailyScores.length === 0) return 0;
  const sum = dailyScores.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / dailyScores.length);
}

export function calculateYearlyProgress(monthlyScores: number[]): number {
  if (!monthlyScores || monthlyScores.length === 0) return 0;
  const sum = monthlyScores.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / monthlyScores.length);
}
