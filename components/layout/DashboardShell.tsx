"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import Link from "next/link";
import { X, Zap } from "lucide-react";
import { APP_CONFIG, NAV_LINKS } from "@/lib/const";

interface DashboardShellProps {
  children: ReactNode;
  selectedDate?: string;
  overallProgress?: number;
}

export function DashboardShell({
  children,
  selectedDate = "2026-10-01",
  overallProgress = 72,
}: DashboardShellProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#070913] text-slate-100 system-bg-grid relative selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background radial energy glows */}
      <div className="pointer-events-none fixed inset-0 radial-aura z-0 opacity-80" />
      <div className="pointer-events-none fixed inset-0 radial-aura-bottom z-0 opacity-70" />

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 bg-[#090d1a] border-r border-white/10 p-5 flex flex-col z-10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="font-bold text-base text-white">{APP_CONFIG.name}</span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1.5 flex-1 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 z-10">
        <Header
          onMenuToggle={() => setMobileDrawerOpen(true)}
          selectedDate={selectedDate}
          overallProgress={overallProgress}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 pb-24 lg:pb-12 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Nav */}
      <MobileNav />
    </div>
  );
}
