import { getCategoryData } from "@/lib/services/categoriesService";
import { CategoryDetailView } from "@/components/categories/CategoryDetailView";

export const metadata = {
  title: "Ascend — Food Routine Sector",
  description: "Clean nutrition, meal completion, and daily hydration protocol.",
};

export default async function FoodCategoryPage() {
  const { entry } = await getCategoryData("food", "2026-10-01");
  return <CategoryDetailView categoryId="food" entry={entry} />;
}
