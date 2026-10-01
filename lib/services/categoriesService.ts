// Categories Service (Plain functions, no classes)

import { CATEGORIES, type CategoryId } from "@/lib/const";
import { getDailyEntry } from "@/lib/services/entriesService";
import type { DailyEntry } from "@/lib/types";

export function getCategoryConfig(categoryId: string) {
  return CATEGORIES.find((c) => c.id === categoryId || c.slug === categoryId);
}

export async function getCategoryData(
  categoryId: CategoryId,
  date: string
): Promise<{
  config: (typeof CATEGORIES)[number] | undefined;
  entry: DailyEntry;
}> {
  const config = getCategoryConfig(categoryId);
  const entry = await getDailyEntry(date);
  return { config, entry };
}
