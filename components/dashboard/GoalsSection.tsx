"use client";

import { useState } from "react";
import type { Goal } from "@/lib/types";
import { CATEGORIES } from "@/lib/const";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Check, Target, ChevronRight } from "lucide-react";

interface GoalsSectionProps {
  initialGoals: Goal[];
  onToggleGoalTask?: (goalId: string, taskId: string) => void;
}

export function GoalsSection({
  initialGoals,
  onToggleGoalTask,
}: GoalsSectionProps) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const handleTaskToggle = (goalId: string, taskId: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const updatedTasks = g.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        const completed = updatedTasks.filter((t) => t.completed).length;
        const progress = Math.round((completed / updatedTasks.length) * 100);
        return { ...g, tasks: updatedTasks, progress };
      })
    );
    if (onToggleGoalTask) {
      onToggleGoalTask(goalId, taskId);
    }
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            Active Campaign Goals
            <Target className="h-4 w-4 text-purple-400" />
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Long-term milestone benchmarks and skill ascension targets
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const cat = CATEGORIES.find((c) => c.id === goal.categoryId) || CATEGORIES[0];
          return (
            <div
              key={goal.id}
              className="flex flex-col justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-purple-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
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
                  <span className="text-xs font-mono font-bold text-purple-400">
                    {goal.progress}%
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white tracking-tight">
                  {goal.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {goal.description}
                </p>

                <div className="my-3">
                  <ProgressBar
                    progress={goal.progress}
                    color="from-purple-500 to-sky-400"
                    height="h-1.5"
                  />
                </div>

                {/* Sub-tasks checklist */}
                <div className="space-y-1.5 mt-3 pt-3 border-t border-white/5">
                  {goal.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskToggle(goal.id, task.id)}
                      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer text-xs group"
                    >
                      <div
                        className={`h-4 w-4 rounded flex items-center justify-center border transition-colors ${
                          task.completed
                            ? "bg-purple-600 border-purple-500 text-white"
                            : "border-slate-600 group-hover:border-purple-400"
                        }`}
                      >
                        {task.completed && <Check className="h-3 w-3" />}
                      </div>
                      <span
                        className={`transition-colors ${
                          task.completed
                            ? "text-slate-500 line-through"
                            : "text-slate-300"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 text-[11px] text-slate-400 font-mono flex justify-between">
                <span>Target Date:</span>
                <span className="text-slate-300">{goal.targetDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
