import { getCategoryData } from "@/lib/services/categoriesService";
import { CategoryDetailView } from "@/components/categories/CategoryDetailView";

export const metadata = {
  title: "Ascend — Expense Sector",
  description: "Financial discipline, daily spend, and budget management.",
};

export default async function ExpenseCategoryPage() {
  const { entry } = await getCategoryData("expense", "2026-10-01");
  return <CategoryDetailView categoryId="expense" entry={entry} />;
}
