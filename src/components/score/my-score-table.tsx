import { motion } from "framer-motion";
import { CheckCircle2, Clock, Target, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/theme";
import {
  loadMyScores,
  subscribeMyScores,
  toggleIncludeScore,
  type MyScore,
} from "../../lib/myScores";
import Toast, { type ToastType } from "../ui/toast";
import EmptyScores from "./empty-scores";
import { EASE_OUT } from "./score-data";

/** Shows the player's own recorded races in real time, reading from local storage. */
export default function MyScoreTable() {
  const { darkMode } = useTheme();
  const [scores, setScores] = useState<MyScore[]>(() => loadMyScores());
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: ToastType;
  }>({ open: false, message: "", type: "success" });

  useEffect(() => {
    const refresh = () => setScores(loadMyScores());
    return subscribeMyScores(refresh);
  }, []);

  const handleInclude = (score: MyScore, displayNumber: number) => {
    const updated = toggleIncludeScore(score.recordedAt);
    setScores(updated);

    const nowIncluded = updated.find(
      (item) => item.recordedAt === score.recordedAt,
    )?.included;

    if (nowIncluded) {
      setToast({
        open: true,
        message: `Race #${displayNumber} included on the Latest High Scores!`,
        type: "success",
      });
    }
  };

  if (scores.length === 0) {
    return <EmptyScores />;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm ${
          darkMode
            ? "border-slate-200 bg-white/60"
            : "border-white/10 bg-white/5"
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

        {/* Mobile card list */}
        <div className="space-y-3 p-4 sm:hidden">
          {scores.map((score, index) => (
            <motion.div
              key={score.recordedAt}
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
              <div className="flex items-center justify-between">
                <span
                  className={`font-bold tabular-nums ${
                    darkMode ? "text-slate-900" : "text-white"
                  }`}
                >
                  Race #{index + 1}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] whitespace-nowrap ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  <Clock className="h-3 w-3 opacity-70" />
                  {score.time}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-4">
                <span
                  className={`inline-flex items-center gap-1.5 text-sm font-bold tabular-nums ${
                    darkMode ? "text-slate-900" : "text-white"
                  }`}
                >
                  <Zap
                    className={`h-3.5 w-3.5 ${
                      darkMode ? "text-blue-500" : "text-red-500"
                    }`}
                  />
                      {score.speed}
                      <span className="text-[10px] font-semibold text-slate-400">
                        WPM
                      </span>
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-sm font-bold tabular-nums ${
                    darkMode ? "text-slate-900" : "text-white"
                  }`}
                >
                  <Target
                    className={`h-3.5 w-3.5 ${
                      darkMode ? "text-blue-500" : "text-red-500"
                    }`}
                  />
                  {score.accuracy}%
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleInclude(score, index + 1)}
                className={`mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors duration-200 ${
                  score.included
                    ? "border-green-500 bg-green-500 text-white hover:bg-green-600"
                    : darkMode
                      ? "border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                      : "border-white/20 text-slate-300 hover:border-red-400 hover:text-red-400"
                }`}
              >
                {score.included && <CheckCircle2 className="h-3.5 w-3.5" />}
                {score.included ? "Included" : "Include on scoreboard"}
              </button>
            </motion.div>
          ))}
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
                  Race
                </th>
                <th
                  className={`px-4 py-4 text-[11px] font-bold tracking-wider uppercase sm:px-6 ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Speed
                </th>
                <th
                  className={`px-4 py-4 text-[11px] font-bold tracking-wider uppercase sm:px-6 ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Accuracy
                </th>
                <th
                  className={`px-4 py-4 text-[11px] font-bold tracking-wider uppercase sm:px-6 ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Time
                </th>
                <th
                  className={`px-4 py-4 pr-6 text-right text-[11px] font-bold tracking-wider uppercase sm:px-6 ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Include on the scoreboard
                </th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <motion.tr
                  key={score.recordedAt}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: EASE_OUT,
                  }}
                  className={`border-b last:border-b-0 ${
                    darkMode
                      ? "border-slate-100 hover:bg-blue-50/60"
                      : "border-white/10 hover:bg-white/6"
                  }`}
                >
                  <td
                    className={`px-4 py-4 pl-6 font-bold tabular-nums sm:px-6 ${
                      darkMode ? "text-slate-900" : "text-white"
                    }`}
                  >
                    #{index + 1}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 font-bold tabular-nums ${
                        darkMode ? "text-slate-900" : "text-white"
                      }`}
                    >
                      <Zap
                        className={`h-3.5 w-3.5 ${
                          darkMode ? "text-blue-500" : "text-red-500"
                        }`}
                      />
                      {score.speed}
                      <span className="text-[10px] font-semibold text-slate-400">
                        WPM
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 font-bold tabular-nums ${
                        darkMode ? "text-slate-900" : "text-white"
                      }`}
                    >
                      <Target
                        className={`h-3.5 w-3.5 ${
                          darkMode ? "text-blue-500" : "text-red-500"
                        }`}
                      />
                      {score.accuracy}%
                    </span>
                  </td>
                  <td className="px-4 py-4 sm:px-6">
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
                      {score.time}
                    </span>
                  </td>
                  <td className="px-4 py-4 pr-6 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => handleInclude(score, index + 1)}
                      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors duration-200 ${
                        score.included
                          ? "border-green-500 bg-green-500 text-white hover:bg-green-600"
                          : darkMode
                            ? "border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                            : "border-white/20 text-slate-300 hover:border-red-400 hover:text-red-400"
                      }`}
                    >
                      {score.included && (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      )}
                      {score.included ? "Included" : "Include"}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}
