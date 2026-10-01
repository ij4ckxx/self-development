"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, GraduationCap, Dumbbell, User } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/category/study", label: "Study", icon: GraduationCap },
    { href: "/dashboard/category/workout", label: "Workout", icon: Dumbbell },
    { href: "/dashboard/date/2026-10-01", label: "Today", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#090d1a]/95 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around">
      {links.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-medium transition-all ${
              isActive
                ? "text-purple-400 font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon className={`h-5 w-5 mb-0.5 ${isActive ? "text-purple-400" : "text-slate-400"}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
