/** Persists the player's own race results to localStorage so the Score page can read them across navigations. */

export type MyScore = {
  race: number;
  name: string;
  speed: number;
  accuracy: number;
  time: string;
  recordedAt: number;
  included: boolean;
};

const STORAGE_KEY = "fasttyping:my-scores";
const UPDATE_EVENT = "fasttyping:my-scores-updated";
const MAX_STORED = 50;

function readRaw(): MyScore[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Discard legacy entries recorded before the player-name gate existed.
    return parsed.filter(
      (score): score is MyScore =>
        typeof score?.name === "string" && score.name.trim().length > 0,
    );
  } catch {
    return [];
  }
}

function writeRaw(scores: MyScore[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function loadMyScores(): MyScore[] {
  return readRaw();
}

/** Records a finished race and returns the updated, newest-first list. */
export function saveMyScore(entry: {
  name: string;
  speed: number;
  accuracy: number;
  time: string;
}): MyScore[] {
  const existing = readRaw();
  const nextScore: MyScore = {
    ...entry,
    race: existing.length + 1,
    recordedAt: Date.now(),
    included: false,
  };
  const updated = [nextScore, ...existing].slice(0, MAX_STORED);
  writeRaw(updated);
  return updated;
}

/** Selects a single race to show on the Latest High Scores leaderboard (deselecting any other). */
export function toggleIncludeScore(recordedAt: number): MyScore[] {
  const existing = readRaw();
  const target = existing.find((score) => score.recordedAt === recordedAt);
  const willInclude = !target?.included;
  const updated = existing.map((score) => ({
    ...score,
    included: score.recordedAt === recordedAt ? willInclude : false,
  }));
  writeRaw(updated);
  return updated;
}

export function clearMyScores(): void {
  writeRaw([]);
}

/** Formats a timestamp as a short "x minutes/hours/days ago" string. */
export function formatRelativeTime(timestamp: number): string {
  const diffMinutes = Math.floor((Date.now() - timestamp) / 60000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

/** Notifies listeners when scores change, including updates from other tabs. */
export function subscribeMyScores(callback: () => void): () => void {
  window.addEventListener(UPDATE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(UPDATE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
