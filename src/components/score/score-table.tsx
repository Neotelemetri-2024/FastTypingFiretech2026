import { motion } from "framer-motion";
import { Clock, Crown, Medal } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/theme";
import { PLAYER_NAME } from "../typing/typing-data";
import {
  formatRelativeTime,
  loadMyScores,
  subscribeMyScores,
} from "../../lib/myScores";
import EmptyScores from "./empty-scores";
import { EASE_OUT, medalStyle, ordinal, type ScoreEntry } from "./score-data";
import ScoreRow from "./score-row";

/** Ranks the races the player has included, fastest first, as the live leaderboard. */
function toLeaderboard(): ScoreEntry[] {
  return loadMyScores()
    .filter((score) => score.included)
    .sort((a, b) => b.speed - a.speed)
    .map((score, index) => ({
      rank: index + 1,
      name: PLAYER_NAME,
      speed: score.speed,
      time: formatRelativeTime(score.recordedAt),
    }));
}

export default function ScoreTable() {
  const { darkMode } = useTheme();
  const [entries, setEntries] = useState<ScoreEntry[]>(() => toLeaderboard());

  useEffect(() => {
    const refresh = () => setEntries(toLeaderboard());
    return subscribeMyScores(refresh);
  }, []);

  if (entries.length === 0) {
    return <EmptyScores />;
  }

  const topSpeed = entries[0].speed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm ${
        darkMode ? "border-slate-200 bg-white/60" : "border-white/10 bg-white/5"
      }`}
    >
      {/* Top accent line */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-1/2 h-px w-4/5 -translate-x-1/2 ${
          darkMode
            ? "bg-linear-to-r from-transparent via-blue-500/60 to-transparent"
            : "bg-linear-to-r from-transparent via-red-500/60 to-transparent"
        }`}
      />

      <div className="space-y-3 p-4 sm:hidden">
        {entries.map((entry, index) => {
          const medal = medalStyle(entry.rank, darkMode);
          const pct = Math.round((entry.speed / topSpeed) * 100);

          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
                ease: EASE_OUT,
              }}
              className={`rounded-xl border p-4 ${
                darkMode
                  ? "border-slate-200 bg-white"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {entry.rank <= 3 && medal ? (
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${medal.chip} ${medal.ring}`}
                    >
                      <Medal className="h-4 w-4" fill="currentColor" />
                    </span>
                  ) : (
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold tabular-nums ${
                        darkMode
                          ? "border-slate-200 text-slate-500"
                          : "border-white/15 text-slate-400"
                      }`}
                    >
                      {entry.rank}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`truncate font-bold ${
                          darkMode ? "text-slate-900" : "text-white"
                        }`}
                      >
                        {entry.name}
                      </span>
                      {entry.rank === 1 && (
                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-bold ${
                            darkMode
                              ? "border-amber-200 bg-amber-100 text-amber-600"
                              : "border-amber-400/30 bg-amber-400/15 text-amber-400"
                          }`}
                        >
                          <Crown className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[11px] ${
                        darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {entry.rank}
                      {ordinal(entry.rank)} place
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p
                    className={`font-bold tabular-nums ${
                      darkMode ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {entry.speed}{" "}
                    <span className="text-[10px] font-semibold text-slate-400">
                      WPM
                    </span>
                  </p>
                  <p
                    className={`mt-1 inline-flex items-center gap-1 text-[11px] whitespace-nowrap ${
                      darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    <Clock className="h-3 w-3 opacity-70" />
                    {entry.time}
                  </p>
                </div>
              </div>

              <div
                className={`mt-3 h-1.5 w-full overflow-hidden rounded-full ${
                  darkMode ? "bg-slate-100" : "bg-white/10"
                }`}
              >
                <div
                  className={`h-full rounded-full ${
                    darkMode ? "bg-blue-500" : "bg-red-500"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block sm:overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              className={`border-b ${
                darkMode ? "border-slate-200" : "border-white/15"
              }`}
            >
              <th
                className={`px-4 py-4 pl-6 text-[11px] font-bold tracking-wider uppercase sm:px-6 ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Rank
              </th>
              <th
                className={`px-4 py-4 text-[11px] font-bold tracking-wider uppercase sm:px-6 ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Player
              </th>
              <th
                className={`px-4 py-4 text-[11px] font-bold tracking-wider uppercase sm:px-6 ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Speed
              </th>
              <th
                className={`px-4 py-4 pr-6 text-right text-[11px] font-bold tracking-wider uppercase sm:px-6 ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <ScoreRow
                key={entry.rank}
                entry={entry}
                index={index}
                topSpeed={topSpeed}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
