"use client";

import { useState } from "react";
import { CATEGORIES, type CategoryId } from "@/lib/const";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles } from "lucide-react";

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: string;
  initialCategory?: CategoryId;
}

export function QuickAddModal({
  isOpen,
  onClose,
  defaultDate = "2026-10-01",
  initialCategory = "study",
}: QuickAddModalProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(initialCategory);
  const [isSaved, setIsSaved] = useState(false);

  // Form states
  const [commActivity, setCommActivity] = useState("");
  const [commMinutes, setCommMinutes] = useState(30);
  const [commVocab, setCommVocab] = useState("");

  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Food");
  const [expenseDesc, setExpenseDesc] = useState("");

  const [foodBreakfast, setFoodBreakfast] = useState(true);
  const [foodLunch, setFoodLunch] = useState(true);
  const [foodDinner, setFoodDinner] = useState(false);
  const [foodWater, setFoodWater] = useState(2.5);

  const [skinMorning, setSkinMorning] = useState(true);
  const [skinNight, setSkinNight] = useState(false);
  const [skinSunscreen, setSkinSunscreen] = useState(true);

  const [studyTopic, setStudyTopic] = useState("");
  const [studyDuration, setStudyDuration] = useState(60);

  const [workoutType, setWorkoutType] = useState("Strength / Weights");
  const [workoutMinutes, setWorkoutMinutes] = useState(45);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Daily Progression"
      subtitle="Select a pillar sector to log today's deliberate action"
      maxWidth="max-w-xl"
    >
      {/* Category Sector Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 mb-5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2 py-2 text-xs font-semibold rounded-lg transition-all truncate text-center cursor-pointer ${
                isActive
                  ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              {cat.name.split(" ")[0]}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {activeCategory === "communication" && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Speaking Activity / Topic
              </label>
              <input
                type="text"
                placeholder="e.g. 15 min impromptu presentation drill"
                value={commActivity}
                onChange={(e) => setCommActivity(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={commMinutes}
                  onChange={(e) => setCommMinutes(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Vocabulary Learned
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pragmatic, Substantiate"
                  value={commVocab}
                  onChange={(e) => setCommVocab(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeCategory === "expense" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="350"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Study">Study</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description
              </label>
              <input
                type="text"
                placeholder="e.g. Nutritious lunch or Metro recharge"
                value={expenseDesc}
                onChange={(e) => setExpenseDesc(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>
          </div>
        )}

        {activeCategory === "food" && (
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Habits Completed
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Breakfast Completed", checked: foodBreakfast, set: setFoodBreakfast },
                { label: "Lunch Completed", checked: foodLunch, set: setFoodLunch },
                { label: "Dinner Completed", checked: foodDinner, set: setFoodDinner },
              ].map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-slate-900/60 cursor-pointer text-xs text-slate-200"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) => item.set(e.target.checked)}
                    className="rounded border-slate-700 text-emerald-600 focus:ring-0"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Water Hydration (Liters)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="8"
                value={foodWater}
                onChange={(e) => setFoodWater(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {activeCategory === "skincare" && (
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Grooming Protocol Steps
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: "Morning Routine", checked: skinMorning, set: setSkinMorning },
                { label: "SPF Sunscreen", checked: skinSunscreen, set: setSkinSunscreen },
                { label: "Night Routine", checked: skinNight, set: setSkinNight },
              ].map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-slate-900/60 cursor-pointer text-xs text-slate-200"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) => item.set(e.target.checked)}
                    className="rounded border-slate-700 text-pink-600 focus:ring-0"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeCategory === "study" && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Deep Work Topic
              </label>
              <input
                type="text"
                placeholder="e.g. AWS VPC Peering & CIDR allocations"
                value={studyTopic}
                onChange={(e) => setStudyTopic(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min="10"
                max="600"
                value={studyDuration}
                onChange={(e) => setStudyDuration(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {activeCategory === "workout" && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Workout Type
              </label>
              <select
                value={workoutType}
                onChange={(e) => setWorkoutType(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
              >
                <option value="Strength / Weights">Strength / Weights</option>
                <option value="Calisthenics">Calisthenics</option>
                <option value="Cardio / Running">Cardio / Running</option>
                <option value="HIIT">HIIT</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Session Duration (Minutes)
              </label>
              <input
                type="number"
                min="10"
                max="180"
                value={workoutMinutes}
                onChange={(e) => setWorkoutMinutes(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            glow
            disabled={isSaved}
            className="min-w-[120px]"
          >
            {isSaved ? (
              <span className="flex items-center gap-1.5 text-emerald-300">
                <Check className="h-4 w-4" /> Logged!
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Save Record
              </span>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
