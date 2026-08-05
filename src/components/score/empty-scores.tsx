import { motion } from "framer-motion";
import { Keyboard } from "lucide-react";
import { useTheme } from "../../context/theme";
import { EASE_OUT } from "./score-data";

export default function EmptyScores() {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className={`flex flex-col items-center gap-4 rounded-2xl border px-6 py-20 text-center backdrop-blur-sm ${
        darkMode
          ? "border-slate-200 bg-white/60 text-slate-500"
          : "border-white/10 bg-white/5 text-slate-300"
      }`}
    >
      {/* Floating keyboard icon */}
      <div className="relative">
        <motion.div
          className={`flex h-20 w-20 items-center justify-center rounded-3xl border-2 ${
            darkMode
              ? "border-blue-200 bg-blue-50 text-blue-500 shadow-lg shadow-blue-600/10"
              : "border-white/15 bg-white/5 text-red-500 shadow-lg shadow-black/20"
          }`}
          animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Keyboard className="h-10 w-10" />
        </motion.div>

        {/* Typing dots */}
        <motion.span
          className={`absolute -right-1 -top-1 h-3 w-3 rounded-full ${
            darkMode ? "bg-blue-500" : "bg-red-500"
          }`}
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0.3 }}
        />
        <motion.span
          className={`absolute -left-2 -top-2 h-2 w-2 rounded-full ${
            darkMode ? "bg-blue-400" : "bg-red-400"
          }`}
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0.7 }}
        />
      </div>

      <div className="space-y-1">
        <p
          className={`text-base font-semibold ${
            darkMode ? "text-slate-700" : "text-white"
          }`}
        >
          You don't have a score yet.
        </p>
        <p className="text-sm opacity-80">
          Start typing to set your first record!
        </p>
      </div>

      {/* Pulsing dots */}
      <div className="flex gap-1.5 pt-1">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className={`h-1.5 w-1.5 rounded-full ${
              darkMode ? "bg-blue-500" : "bg-red-500"
            }`}
            animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: dot * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
