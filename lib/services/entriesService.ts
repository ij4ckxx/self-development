// Daily Entries Service (Plain functions, no classes)
// Ready to swap mock calls with fetch("NODE_BACKEND_URL/api/daily-entries")

import { MOCK_DAILY_ENTRIES, MOCK_DAILY_ENTRY_TODAY } from "@/lib/mock/data";
import type { DailyEntry } from "@/lib/types";
import type { TaskStatus } from "@/lib/const";

// In-memory runtime cache for client state persistence
const runtimeEntries: Record<string, DailyEntry> = { ...MOCK_DAILY_ENTRIES };

export async function getDailyEntry(date: string): Promise<DailyEntry> {
  await new Promise((r) => setTimeout(r, 40));

  if (runtimeEntries[date]) {
    return runtimeEntries[date];
  }

  // Fallback template for any date clicked
  const newDateEntry: DailyEntry = {
    ...MOCK_DAILY_ENTRY_TODAY,
    id: `entry_${date.replace(/-/g, "_")}`,
    date,
    overallProgress: 50,
    completedTasksCount: 4,
    pendingTasksCount: 4,
    streakDays: 7,
    dailyNote: `Logged activities for ${date}.`,
  };
  runtimeEntries[date] = newDateEntry;
  return newDateEntry;
}

export async function saveDailyEntry(entry: DailyEntry): Promise<DailyEntry> {
  await new Promise((r) => setTimeout(r, 50));
  runtimeEntries[entry.date] = entry;
  return entry;
}

export async function toggleTaskStatus(
  date: string,
  taskId: string
): Promise<DailyEntry> {
  const entry = await getDailyEntry(date);
  const updatedTasks = entry.study.tasks.map((task) => {
    if (task.id === taskId) {
      const nextStatus: TaskStatus = task.status === "completed" ? "pending" : "completed";
      return { ...task, status: nextStatus };
    }
    return task;
  });

  const completedCount = updatedTasks.filter((t) => t.status === "completed").length;
  const pendingCount = updatedTasks.filter((t) => t.status === "pending").length;

  const updatedEntry: DailyEntry = {
    ...entry,
    completedTasksCount: completedCount + 4,
    pendingTasksCount: pendingCount,
    study: {
      ...entry.study,
      tasks: updatedTasks,
    },
  };

  return saveDailyEntry(updatedEntry);
}
