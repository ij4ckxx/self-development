import { getCategoryData } from "@/lib/services/categoriesService";
import { CategoryDetailView } from "@/components/categories/CategoryDetailView";

export const metadata = {
  title: "Ascend — Study & Goals Sector",
  description: "Deep work, knowledge ascension, topic breakdown, and milestone goals.",
};

export default async function StudyCategoryPage() {
  const { entry } = await getCategoryData("study", "2026-10-01");
  return <CategoryDetailView categoryId="study" entry={entry} />;
}
