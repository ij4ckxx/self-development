import { getDailyEntry } from "@/lib/services/entriesService";
import { DailyDateView } from "@/components/dashboard/DailyDateView";

export const metadata = {
  title: "Ascend — Daily Progression Archive",
  description: "Detailed daily log and completion record.",
};

export default async function DatePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const entry = await getDailyEntry(date);

  return <DailyDateView entry={entry} />;
}
