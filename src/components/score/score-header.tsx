import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useTheme } from "../../context/theme";
import { EASE_OUT } from "./score-data";

export default function ScoreHeader() {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="mb-10 text-center"
    >
      {/* Badge */}
      <motion.div
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase ${
          darkMode
            ? "border-slate-200 bg-white/60 text-slate-600"
            : "border-white/15 bg-white/5 text-slate-300"
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
      >
        <motion.span
          className={`h-2 w-2 rounded-full ${
            darkMode ? "bg-blue-600" : "bg-red-500"
          }`}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        Firetech 2026 · Live
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6, ease: EASE_OUT }}
        className={`mt-5 flex items-center justify-center gap-3 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl ${
          darkMode ? "text-slate-900" : "text-white"
        }`}
      >
        <motion.span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${
            darkMode
              ? "bg-blue-100 text-blue-600 shadow-lg shadow-blue-600/20"
              : "bg-red-500/15 text-red-500 shadow-lg shadow-red-600/20"
          }`}
          initial={{ rotate: -30, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.4 }}
        >
          <Trophy className="h-7 w-7 sm:h-8 sm:w-8" />
        </motion.span>
        <span>Scoreboard</span>
      </motion.h1>

      {/* Underline */}
      <motion.div
        className={`mx-auto mt-4 h-1 rounded-full ${
          darkMode ? "bg-blue-600" : "bg-red-600"
        }`}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 88, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.6, ease: EASE_OUT }}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: EASE_OUT }}
        className={`mx-auto mt-4 max-w-md text-sm leading-relaxed sm:text-base ${
          darkMode ? "text-slate-500" : "text-slate-300"
        }`}
      >
        The typing speed records of the fastest participants—who holds the
        crown this time?
      </motion.p>
    </motion.div>
  );
}
