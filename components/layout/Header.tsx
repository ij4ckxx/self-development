"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Calendar, Bell, Menu, X, Zap } from "lucide-react";
import { Button } from "@/lib/../components/ui/Button";
import { CURRENT_USER } from "@/lib/const";
import { QuickAddModal } from "@/components/forms/QuickAddModal";

interface HeaderProps {
  onMenuToggle?: () => void;
  selectedDate?: string;
  overallProgress?: number;
}

export function Header({
  onMenuToggle,
  selectedDate = "2026-10-01",
  overallProgress = 72,
}: HeaderProps) {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/8 bg-[#090d1a]/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile hamburger & Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Good morning, {CURRENT_USER.name}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>
            <p className="hidden sm:block text-xs text-slate-400 font-medium">
              Thursday, October 1, 2026 • Progression Day 274
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Progress Badge */}
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/8">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Daily Score
              </p>
              <p className="text-xs font-bold text-purple-400 font-mono">
                {overallProgress}%
              </p>
            </div>
            <div className="h-7 w-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Date Shortcut */}
          <Link
            href={`/dashboard/date/${selectedDate}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/8 bg-white/[0.02] text-xs font-medium text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            <Calendar className="h-3.5 w-3.5 text-purple-400" />
            <span>Today's Log</span>
          </Link>

          {/* Quick Add CTA */}
          <Button
            size="sm"
            variant="primary"
            glow
            onClick={() => setIsQuickAddOpen(true)}
            className="shadow-[0_0_15px_rgba(168,85,247,0.35)]"
          >
            <Plus className="h-4 w-4" />
            <span>Add Entry</span>
          </Button>
        </div>
      </header>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        defaultDate={selectedDate}
      />
    </>
  );
}
