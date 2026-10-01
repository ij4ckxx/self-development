// Application Constants
// All constants are defined here as plain objects/arrays (no classes)

export const APP_CONFIG = {
  name: "ASCEND",
  systemTitle: "System V2.0",
  subtitle: "Personal Progression & Self-Development",
  version: "2.4.0",
  status: "ONLINE",
  defaultCurrency: "₹",
};

export const CURRENT_USER = {
  id: "usr_001",
  name: "Jegan",
  title: "Shadow Monarch",
  rank: "S-Rank Sovereign",
  level: 42,
  exp: 7850,
  maxExp: 10000,
  avatar: "/avatars/avatar.png",
  joinedDate: "2026-01-01",
};

export const TIME_RANGES = [
  { id: "day", label: "Day" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "year", label: "Year" },
] as const;

export type TimeRangeId = (typeof TIME_RANGES)[number]["id"];

export const CATEGORIES = [
  {
    id: "communication",
    slug: "communication",
    name: "Communication",
    tagline: "Speech, English Mastery & Articulation",
    color: "#38bdf8", // Sky blue
    glowColor: "rgba(56, 189, 248, 0.4)",
    accentGradient: "from-sky-500/20 via-sky-500/5 to-transparent",
    borderGlow: "hover:border-sky-500/50",
    iconName: "MessageSquare",
    route: "/dashboard/category/communication",
    metricLabel: "Practice Time",
    targetUnit: "min",
    defaultDailyTarget: 30,
  },
  {
    id: "expense",
    slug: "expense",
    name: "Expense",
    tagline: "Financial Discipline & Budget Control",
    color: "#f59e0b", // Amber
    glowColor: "rgba(245, 158, 11, 0.4)",
    accentGradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    borderGlow: "hover:border-amber-500/50",
    iconName: "Wallet",
    route: "/dashboard/category/expense",
    metricLabel: "Daily Spend",
    targetUnit: "₹",
    defaultDailyTarget: 1000,
  },
  {
    id: "food",
    slug: "food",
    name: "Food Routine",
    tagline: "Clean Nutrition & Hydration Tracking",
    color: "#10b981", // Emerald
    glowColor: "rgba(16, 185, 129, 0.4)",
    accentGradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    borderGlow: "hover:border-emerald-500/50",
    iconName: "Utensils",
    route: "/dashboard/category/food",
    metricLabel: "Meal Habits",
    targetUnit: "habits",
    defaultDailyTarget: 5,
  },
  {
    id: "skincare",
    slug: "skincare",
    name: "Skin Care",
    tagline: "Grooming, Sleep & Hydration Protocol",
    color: "#ec4899", // Pink
    glowColor: "rgba(236, 72, 153, 0.4)",
    accentGradient: "from-pink-500/20 via-pink-500/5 to-transparent",
    borderGlow: "hover:border-pink-500/50",
    iconName: "Sparkles",
    route: "/dashboard/category/skincare",
    metricLabel: "Routines Done",
    targetUnit: "steps",
    defaultDailyTarget: 4,
  },
  {
    id: "study",
    slug: "study",
    name: "Study & Goals",
    tagline: "Deep Work, Knowledge & Skill Ascension",
    color: "#a855f7", // Purple / Violet
    glowColor: "rgba(168, 85, 247, 0.4)",
    accentGradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    borderGlow: "hover:border-purple-500/50",
    iconName: "GraduationCap",
    route: "/dashboard/category/study",
    metricLabel: "Study Time",
    targetUnit: "hours",
    defaultDailyTarget: 3,
  },
  {
    id: "workout",
    slug: "workout",
    name: "Workout",
    tagline: "Physical Strength, Conditioning & Power",
    color: "#ef4444", // Crimson Red
    glowColor: "rgba(239, 68, 68, 0.4)",
    accentGradient: "from-red-500/20 via-red-500/5 to-transparent",
    borderGlow: "hover:border-red-500/50",
    iconName: "Dumbbell",
    route: "/dashboard/category/workout",
    metricLabel: "Duration",
    targetUnit: "min",
    defaultDailyTarget: 45,
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/dashboard/calendar", label: "Calendar", icon: "Calendar" },
  { href: "/dashboard/category/study", label: "Study & Goals", icon: "GraduationCap" },
  { href: "/dashboard/category/workout", label: "Workout", icon: "Dumbbell" },
  { href: "/dashboard/category/communication", label: "Communication", icon: "MessageSquare" },
  { href: "/dashboard/category/expense", label: "Expense", icon: "Wallet" },
  { href: "/dashboard/category/food", label: "Food Routine", icon: "Utensils" },
  { href: "/dashboard/category/skincare", label: "Skin Care", icon: "Sparkles" },
] as const;

export const EXPENSE_CATEGORIES = [
  "Food",
  "Travel",
  "Study",
  "Bills",
  "Health",
  "Shopping",
  "Entertainment",
  "Other",
] as const;

export const PAYMENT_METHODS = [
  "UPI / GPay",
  "Credit Card",
  "Debit Card",
  "Cash",
  "Net Banking",
] as const;

export const COMMUNICATION_SKILLS = [
  "Speaking",
  "English Practice",
  "Vocabulary",
  "Listening",
  "Reading",
  "Presentation",
] as const;

export const WORKOUT_TYPES = [
  "Strength / Weights",
  "Calisthenics",
  "Cardio / Running",
  "HIIT",
  "Stretching / Mobility",
] as const;

export const TASK_PRIORITIES = ["High", "Medium", "Low"] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export const TASK_STATUSES = ["pending", "in_progress", "completed"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
