import { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const metadata = {
  title: "Ascend — Sovereign Self-Development System",
  description: "Futuristic personal progression dashboard tracking habits, deep study, workouts, communication, and discipline.",
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
