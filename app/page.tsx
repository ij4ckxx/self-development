import Link from "next/link";
import {
  Zap,
  ArrowRight,
  Shield,
  Sparkles,
  GraduationCap,
  Dumbbell,
  MessageSquare,
  Wallet,
  Utensils,
  TrendingUp,
} from "lucide-react";
import { APP_CONFIG, CURRENT_USER, CATEGORIES } from "@/lib/const";

export const metadata = {
  title: "Ascend — Self Development Progression System",
  description:
    "A personal progression system tracking communication, expenses, food routines, skincare, deep study, and workouts.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 system-bg-grid overflow-hidden">
      {/* Background Radial Auroras */}
      <div className="pointer-events-none fixed inset-0 radial-aura z-0 opacity-80" />
      <div className="pointer-events-none fixed inset-0 radial-aura-bottom z-0 opacity-70" />

      {/* Navigation Header */}
      <header className="relative z-10 flex h-20 items-center justify-between px-6 lg:px-12 border-b border-white/8 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-black tracking-wider text-white">
              {APP_CONFIG.name}
            </span>
            <span className="ml-2 text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">
              V2.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer"
          >
            <span>Open System</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
        {/* Sovereign Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)] mb-8">
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span>Real-Life Character Progression Dashboard</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Awaken Your Real-Life{" "}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
            Progression System
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Transform your daily habits, speech practice, financial discipline, deep study, and physical strength into an immersive personal dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition-all cursor-pointer"
          >
            <span>Launch Sovereign Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/dashboard/date/2026-10-01"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span>Inspect Today's Log</span>
          </Link>
        </div>

        {/* Six Core Pillars Grid */}
        <div className="mt-20 text-left">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Six Core Development Sectors
              </h2>
              <p className="text-xs text-slate-400">
                Synchronized daily tracking across all dimensions of self-mastery
              </p>
            </div>
            <span className="text-xs font-mono text-purple-400 font-semibold">
              Player Level {CURRENT_USER.level}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.route}
                className="group p-5 rounded-2xl border border-white/8 bg-[#0d1222]/80 backdrop-blur-md hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                    style={{
                      borderColor: `${cat.color}40`,
                      color: cat.color,
                      backgroundColor: `${cat.color}15`,
                    }}
                  >
                    {cat.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {cat.name} Sector
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-normal">
                  {cat.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
