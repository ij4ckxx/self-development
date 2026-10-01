import { getCategoryData } from "@/lib/services/categoriesService";
import { CategoryDetailView } from "@/components/categories/CategoryDetailView";

export const metadata = {
  title: "Ascend — Skin Care Sector",
  description: "Grooming, morning routine, night routine, and rest recovery.",
};

export default async function SkinCareCategoryPage() {
  const { entry } = await getCategoryData("skincare", "2026-10-01");
  return <CategoryDetailView categoryId="skincare" entry={entry} />;
}
