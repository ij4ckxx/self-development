import { getCategoryData } from "@/lib/services/categoriesService";
import { CategoryDetailView } from "@/components/categories/CategoryDetailView";

export const metadata = {
  title: "Ascend — Workout Sector",
  description: "Physical conditioning, strength routines, sets, reps, and workout duration.",
};

export default async function WorkoutCategoryPage() {
  const { entry } = await getCategoryData("workout", "2026-10-01");
  return <CategoryDetailView categoryId="workout" entry={entry} />;
}
