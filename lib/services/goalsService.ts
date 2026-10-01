// Goals Service (Plain functions, no classes)
// Ready to swap mock calls with fetch("NODE_BACKEND_URL/api/goals")

import { MOCK_GOALS } from "@/lib/mock/data";
import type { Goal } from "@/lib/types";

let runtimeGoals: Goal[] = [...MOCK_GOALS];

export async function getGoals(): Promise<Goal[]> {
  await new Promise((r) => setTimeout(r, 30));
  return [...runtimeGoals];
}

export async function addGoal(newGoal: Goal): Promise<Goal> {
  await new Promise((r) => setTimeout(r, 40));
  runtimeGoals = [newGoal, ...runtimeGoals];
  return newGoal;
}

export async function toggleGoalTask(
  goalId: string,
  taskId: string
): Promise<Goal | null> {
  await new Promise((r) => setTimeout(r, 30));
  const goalIndex = runtimeGoals.findIndex((g) => g.id === goalId);
  if (goalIndex === -1) return null;

  const goal = runtimeGoals[goalIndex];
  const updatedTasks = goal.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );

  const completedCount = updatedTasks.filter((t) => t.completed).length;
  const progress = Math.round((completedCount / updatedTasks.length) * 100);

  const updatedGoal: Goal = {
    ...goal,
    tasks: updatedTasks,
    progress,
    status: progress === 100 ? "achieved" : "active",
  };

  runtimeGoals[goalIndex] = updatedGoal;
  return updatedGoal;
}
