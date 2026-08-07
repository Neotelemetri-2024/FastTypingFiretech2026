import { motion } from "framer-motion";
import { RotateCcw, Trophy } from "lucide-react";
import { useTheme } from "../../context/theme";
import { EASE_OUT } from "./typing-data";


type RaceFinishedProps = {
  wpm: number;
  accuracy: number;
  progress: number;
  onRestart: () => void;
};

export default function RaceFinished({
  wpm,
  accuracy,
  progress,
  onRestart,
}: RaceFinishedProps) {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={`flex flex-col items-center gap-4 rounded-2xl border border-dashed p-6 text-center backdrop-blur-sm ${
        darkMode
          ? "border-slate-300 bg-white/70"
          : "border-white/20 bg-white/5"
      }`}
    >
      <motion.span
        initial={{ rotate: -30, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.25 }}
        className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${
          darkMode
            ? "bg-blue-100 text-blue-600 shadow-blue-600/20"
            : "bg-red-500/15 text-red-500 shadow-red-600/20"
        }`}
      >
        <Trophy className="h-7 w-7" />
      </motion.span>

      <div>
        <p
          className={`text-2xl font-extrabold tracking-tight ${
            darkMode ? "text-slate-900" : "text-white"
          }`}
        >
          Race complete! 🎉
        </p>
        <p
          className={`mt-1 text-sm ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}
        >
          {wpm} WPM · {Math.round(accuracy)}% accuracy · {Math.round(progress)}%
          finished
        </p>
      </div>

      <motion.button
        type="button"
        onClick={onRestart}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={`flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-colors ${
          darkMode
            ? "bg-blue-600 shadow-blue-600/30 hover:bg-blue-700"
            : "bg-red-600 shadow-red-600/30 hover:bg-red-700"
        }`}
      >
        <RotateCcw className="h-4 w-4" />
        Try again
      </motion.button>
    </motion.div>
  );
}
