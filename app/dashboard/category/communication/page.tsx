import { getCategoryData } from "@/lib/services/categoriesService";
import { CategoryDetailView } from "@/components/categories/CategoryDetailView";

export const metadata = {
  title: "Ascend — Communication Sector",
  description: "Communication, articulation, vocabulary and speaking practice.",
};

export default async function CommunicationCategoryPage() {
  const { entry } = await getCategoryData("communication", "2026-10-01");
  return <CategoryDetailView categoryId="communication" entry={entry} />;
}
