import { Megaphone, User, type LucideIcon } from "lucide-react";

export type ScoreEntry = {
  rank: number;
  name: string;
  speed: number;
  time: string;
};

export type ScoreTab = "latest" | "mine";

export const TABS: { id: ScoreTab; label: string; icon: LucideIcon }[] = [
  { id: "latest", label: "Latest High Scores", icon: Megaphone },
  { id: "mine", label: "My Scores", icon: User },
];

export const FLOAT_KEYS = [
  { label: "Q", position: "left-2 top-14", delay: 0, duration: 4 },
  { label: "W", position: "right-2 top-44", delay: 0.8, duration: 4.6 },
  { label: "E", position: "left-4 bottom-10", delay: 1.4, duration: 4.2 },
  { label: "R", position: "right-6 bottom-6", delay: 0.4, duration: 5 },
];

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ordinal(rank: number): string {
  if (rank % 100 >= 11 && rank % 100 <= 13) return "th";
  switch (rank % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/** Chip/ring classes for the top-3 medal badges, shared by the desktop row and mobile card. */
export function medalStyle(
  rank: number,
  darkMode: boolean,
): { chip: string; ring: string } | undefined {
  const styles: Record<number, { chip: string; ring: string }> = {
    1: {
      chip: darkMode
        ? "bg-amber-100 text-amber-600"
        : "bg-amber-400/15 text-amber-400",
      ring: "border-amber-400/50",
    },
    2: {
      chip: darkMode
        ? "bg-slate-200 text-slate-500"
        : "bg-slate-400/15 text-slate-300",
      ring: "border-slate-400/50",
    },
    3: {
      chip: darkMode
        ? "bg-orange-100 text-orange-700"
        : "bg-orange-500/15 text-orange-500",
      ring: "border-orange-500/50",
    },
  };
  return styles[rank];
}
