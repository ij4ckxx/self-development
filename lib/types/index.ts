// TypeScript Domain Interfaces for Self-Development Progression System

import type { CategoryId, TaskPriority, TaskStatus, TimeRangeId } from "@/lib/const";

export interface User {
  id: string;
  name: string;
  title: string;
  rank: string;
  level: number;
  exp: number;
  maxExp: number;
  avatar: string;
  joinedDate: string;
}

export interface Task {
  id: string;
  title: string;
  categoryId: CategoryId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  timeEstimate?: string;
  notes?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  categoryId: CategoryId;
  progress: number; // 0 - 100
  targetDate: string;
  status: "active" | "achieved" | "paused";
  tasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export interface ExpenseItem {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  paymentMethod: string;
  isEssential: boolean;
}

export interface CommunicationEntry {
  completed: boolean;
  activity: string;
  durationMinutes: number;
  skills: string[];
  vocabLearned: string[];
  notes?: string;
}

export interface ExpenseEntry {
  items: ExpenseItem[];
  dailyTotal: number;
  monthlyTotal: number;
  budget: number;
  remainingBudget: number;
}

export interface FoodEntry {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  snacksHealthy: boolean;
  waterLiters: number;
  fruitsVeggies: boolean;
  notes?: string;
}

export interface SkinCareEntry {
  morningRoutine: boolean;
  nightRoutine: boolean;
  sunscreen: boolean;
  sleepHours: number;
  notes?: string;
}

export interface StudyEntry {
  completed: boolean;
  studyTimeMinutes: number;
  topics: string[];
  tasks: Task[];
  goals: Goal[];
  notes?: string;
}

export interface WorkoutEntry {
  completed: boolean;
  type: string;
  durationMinutes: number;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weightKg?: number;
  }[];
  caloriesBurned?: number;
  notes?: string;
}

export interface DailyEntry {
  id: string;
  date: string; // YYYY-MM-DD
  overallProgress: number; // 0 - 100%
  completedTasksCount: number;
  pendingTasksCount: number;
  streakDays: number;
  dailyNote?: string;
  communication: CommunicationEntry;
  expense: ExpenseEntry;
  food: FoodEntry;
  skincare: SkinCareEntry;
  study: StudyEntry;
  workout: WorkoutEntry;
}

export interface CategorySummary {
  id: CategoryId;
  name: string;
  completionPercentage: number;
  shortSummary: string;
  status: "Completed" | "In Progress" | "Pending";
  currentValue: number | string;
  targetValue: number | string;
  unit: string;
}

export interface TimelineActivity {
  id: string;
  time: string;
  categoryId: CategoryId;
  title: string;
  detail: string;
  completed: boolean;
}

export interface DashboardSummary {
  user: User;
  selectedDate: string;
  overallProgress: number;
  completedTasksToday: number;
  pendingTasksToday: number;
  currentStreak: number;
  studyHoursToday: number;
  workoutCompletedToday: boolean;
  expensesToday: number;
  categories: CategorySummary[];
  pendingTasks: Task[];
  timelineActivities: TimelineActivity[];
  goals: Goal[];
}

export interface ProgressChartPoint {
  day: string;
  fullDate: string;
  progress: number;
  studyHours: number;
  workoutDone: number; // 1 or 0
  expenses: number;
}

export interface HeatmapDay {
  date: string;
  progress: number; // 0 - 100
  tasksCount: number;
  level: 0 | 1 | 2 | 3 | 4; // for intensity
}

export interface RangeProgressSummary {
  range: TimeRangeId;
  averageProgress: number;
  totalStudyHours: number;
  workoutDaysCount: number;
  communicationDaysCount: number;
  totalExpenses: number;
  completedTasks: number;
  pendingTasks: number;
}
