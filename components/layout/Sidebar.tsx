"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  GraduationCap,
  Dumbbell,
  MessageSquare,
  Wallet,
  Utensils,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { APP_CONFIG, CURRENT_USER, NAV_LINKS } from "@/lib/const";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  Calendar,
  GraduationCap,
  Dumbbell,
  MessageSquare,
  Wallet,
  Utensils,
  Sparkles,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-white/8 bg-[#090d1a]/95 backdrop-blur-xl shrink-0 select-none z-20">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/8">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-sky-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform duration-200">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-wider text-white">
                {APP_CONFIG.name}
              </span>
              <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              {APP_CONFIG.subtitle}
            </p>
          </div>
        </Link>

        {/* Player Hunter Stat Card */}
        <div className="mt-5 p-3 rounded-xl bg-white/[0.03] border border-white/8 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-bold text-white tracking-wide">
                {CURRENT_USER.rank}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-purple-400">
              LVL {CURRENT_USER.level}
            </span>
          </div>

          <div className="mt-2.5">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
              <span>EXP</span>
              <span>
                {CURRENT_USER.exp} / {CURRENT_USER.maxExp}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-sky-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                style={{
                  width: `${(CURRENT_USER.exp / CURRENT_USER.maxExp) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Progression Hub
        </div>
        {NAV_LINKS.map((item) => {
          const Icon = ICON_MAP[item.icon] || LayoutDashboard;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 relative ${
                isActive
                  ? "bg-purple-600/15 text-white border border-purple-500/30 shadow-[0_0_18px_rgba(168,85,247,0.15)]"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive
                      ? "text-purple-400"
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {isActive && (
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,1)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile Area */}
      <div className="p-4 border-t border-white/8 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-sm text-white shadow-[0_0_12px_rgba(147,51,234,0.3)]">
            {CURRENT_USER.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {CURRENT_USER.name}
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {CURRENT_USER.title}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
