"use client";

import { useState } from "react";
import { Check, Clock, AlertCircle } from "lucide-react";
import type { Task } from "@/lib/types";
import { CATEGORIES } from "@/lib/const";
import { Badge } from "@/components/ui/Badge";

interface PendingTasksListProps {
  initialTasks: Task[];
  onTaskCompleted?: (taskId: string) => void;
}

export function PendingTasksList({
  initialTasks,
  onTaskCompleted,
}: PendingTasksListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: t.status === "completed" ? "pending" : ("completed" as const),
            }
          : t
      )
    );
    if (onTaskCompleted) {
      onTaskCompleted(taskId);
    }
  };

  const pendingList = tasks.filter((t) => t.status === "pending");

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            Pending Quests & Objectives
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
              {pendingList.length} Left
            </span>
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            High priority objectives requiring resolution today
          </p>
        </div>
      </div>

      {pendingList.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-emerald-500/20 rounded-xl bg-emerald-500/[0.03]">
          <p className="text-sm font-semibold text-emerald-400">
            All primary objectives cleared!
          </p>
          <p className="text-xs text-slate-400 mt-1">
            System status: Maximum daily discipline achieved.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {pendingList.map((task) => {
            const cat = CATEGORIES.find((c) => c.id === task.categoryId) || CATEGORIES[0];
            return (
              <div
                key={task.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggle(task.id)}
                    className="mt-0.5 h-5 w-5 rounded-md border border-slate-600 bg-slate-900/80 flex items-center justify-center hover:border-purple-400 hover:bg-purple-500/10 transition-colors cursor-pointer shrink-0"
                    aria-label={`Mark ${task.title} completed`}
                  >
                    <Check className="h-3.5 w-3.5 text-transparent group-hover:text-slate-500" />
                  </button>

                  <div>
                    <p className="text-sm font-semibold text-white tracking-tight">
                      {task.title}
                    </p>
                    {task.notes && (
                      <p className="text-xs text-slate-400 mt-0.5">{task.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-md border"
                    style={{
                      borderColor: `${cat.color}30`,
                      color: cat.color,
                      backgroundColor: `${cat.color}10`,
                    }}
                  >
                    {cat.name}
                  </span>

                  <Badge
                    variant={
                      task.priority === "High"
                        ? "rose"
                        : task.priority === "Medium"
                        ? "amber"
                        : "neutral"
                    }
                    size="sm"
                  >
                    {task.priority}
                  </Badge>

                  {task.timeEstimate && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <Clock className="h-3 w-3" />
                      {task.timeEstimate}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
