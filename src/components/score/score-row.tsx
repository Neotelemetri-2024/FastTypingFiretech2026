import { motion } from "framer-motion";
import { Clock, Crown, Medal } from "lucide-react";
import { useTheme } from "../../context/theme";
import { EASE_OUT, medalStyle, ordinal, type ScoreEntry } from "./score-data";

type ScoreRowProps = {
  entry: ScoreEntry;
  index: number;
  topSpeed: number;
};

export default function ScoreRow({ entry, index, topSpeed }: ScoreRowProps) {
  const { darkMode } = useTheme();
  const pct = Math.round((entry.speed / topSpeed) * 100);

  const medal = medalStyle(entry.rank, darkMode);

  return (
    <motion.tr
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: EASE_OUT }}
      className={`group border-b transition-colors duration-300 last:border-b-0 ${
        darkMode ? "border-slate-100" : "border-white/10"
      } ${
        index % 2 === 1 ? (darkMode ? "bg-slate-50/50" : "bg-white/2") : ""
      } ${darkMode ? "hover:bg-blue-50/60" : "hover:bg-white/6"}`}
    >
      {/* Rank */}
      <td className="px-4 py-4 pl-6 sm:px-6">
        {entry.rank <= 3 && medal ? (
          <motion.span
            initial={{ rotate: -180, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.4 + index * 0.04,
            }}
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-sm ${medal.chip} ${medal.ring}`}
          >
            <Medal className="h-5 w-5" fill="currentColor" />
          </motion.span>
        ) : (
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold tabular-nums ${
              darkMode
                ? "border-slate-200 text-slate-500"
                : "border-white/15 text-slate-400"
            }`}
          >
            {entry.rank}
          </span>
        )}
      </td>

      {/* Name */}
      <td className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold transition-transform duration-300 group-hover:scale-110 ${
              darkMode
                ? "bg-blue-100 text-blue-700"
                : "bg-red-500/15 text-red-500"
            }`}
          >
            {entry.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span
                className={`truncate font-bold whitespace-nowrap ${
                  darkMode ? "text-slate-900" : "text-white"
                }`}
              >
                {entry.name}
              </span>
              {entry.rank === 1 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 16,
                    delay: 0.6,
                  }}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${
                    darkMode
                      ? "border-amber-200 bg-amber-100 text-amber-600"
                      : "border-amber-400/30 bg-amber-400/15 text-amber-400"
                  }`}
                >
                  <Crown className="h-3 w-3" />
                  Champion
                </motion.span>
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
      </td>

      {/* Speed */}
      <td className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="hidden w-20 sm:block md:w-28">
            <div
              className={`h-1.5 w-full overflow-hidden rounded-full ${
                darkMode ? "bg-slate-100" : "bg-white/10"
              }`}
            >
              <motion.div
                className={`h-full rounded-full ${
                  darkMode ? "bg-blue-500" : "bg-red-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{
                  duration: 0.8,
                  delay: 0.35 + index * 0.05,
                  ease: EASE_OUT,
                }}
              />
            </div>
          </div>
          <span
            className={`font-bold tabular-nums ${
              darkMode ? "text-slate-900" : "text-white"
            }`}
          >
            {entry.speed}
          </span>
          <span
            className={`text-[10px] font-semibold tracking-wide ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            WPM
          </span>
        </div>
      </td>

      {/* Time */}
      <td className="px-4 py-4 pr-6 text-right sm:px-6">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}
        >
          <Clock
            className={`h-3.5 w-3.5 opacity-70 ${
              darkMode ? "text-blue-500" : "text-red-500/70"
            }`}
          />
          {entry.time}
        </span>
      </td>
    </motion.tr>
  );
}
