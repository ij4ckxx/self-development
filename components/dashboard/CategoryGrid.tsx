"use client";

import type { CategorySummary } from "@/lib/types";
import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  categories: CategorySummary[];
  selectedDate?: string;
  onQuickLog?: (categoryId: string) => void;
}

export function CategoryGrid({
  categories,
  selectedDate = "2026-10-01",
  onQuickLog,
}: CategoryGridProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Six Core Ascension Sectors
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Daily balance and discipline across personal pillars
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            selectedDate={selectedDate}
            onQuickLog={onQuickLog}
          />
        ))}
      </div>
    </div>
  );
}
