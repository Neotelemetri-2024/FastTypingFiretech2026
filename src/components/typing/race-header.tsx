import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useTheme } from "../../context/theme";
import { EASE_OUT, PLAYER_NAME, formatTime } from "./typing-data";

type RaceHeaderProps = {
  secondsLeft: number;
  cpm: number;
  progress: number;
  isFinished: boolean;
};

const LOW_TIME_THRESHOLD = 10;

export default function RaceHeader({
  secondsLeft,
  cpm,
  progress,
  isFinished,
}: RaceHeaderProps) {
  const { darkMode } = useTheme();
  const lowTime = secondsLeft <= LOW_TIME_THRESHOLD && !isFinished;

  const glowColor = darkMode
    ? isFinished
      ? "shadow-blue-600/40"
      : lowTime
        ? "shadow-red-600/50"
        : "shadow-blue-600/40"
    : isFinished
      ? "shadow-red-600/40"
      : lowTime
        ? "shadow-red-600/50"
        : "shadow-red-600/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className={`relative overflow-hidden rounded-t-3xl px-6 pt-6 pb-5 text-white transition-shadow duration-500 ${glowColor} ${
        darkMode
          ? "bg-linear-to-br from-slate-800 via-slate-900 to-blue-950"
          : "bg-linear-to-br from-slate-900 via-red-950 to-slate-950"
      }`}
    >
      {/* Decorative glow + grid accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={`absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl ${
            darkMode ? "bg-blue-500/25" : "bg-red-500/25"
          }`}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="relative">
        {/* Top row — title + timer */}
        <div className="flex items-center justify-between gap-3">
          <motion.h2
            initial={{ x: -16, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE_OUT }}
            className="text-base font-extrabold tracking-tight sm:text-xl"
          >
            The race is on!{" "}
            <span className="font-bold text-white/70">Type the text below:</span>
          </motion.h2>

          <motion.span
            key={secondsLeft}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className={`shrink-0 rounded-xl border border-white/15 bg-black/30 px-3 py-1 text-lg font-extrabold tabular-nums backdrop-blur-sm sm:text-xl ${
              lowTime ? "animate-pulse text-red-300" : "text-white"
            }`}
          >
            {formatTime(secondsLeft)}
          </motion.span>
        </div>

        {/* Player row */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 14,
                delay: 0.2,
              }}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full text-slate-900 shadow-lg ${
                darkMode ? "bg-blue-400" : "bg-red-400"
              }`}
            >
              <User className="h-5 w-5" />
              <motion.span
                className={`absolute inset-0 rounded-full ${
                  darkMode ? "bg-blue-400" : "bg-red-400"
                }`}
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </motion.span>
            <div className="text-sm font-semibold sm:text-base">
              <p>{PLAYER_NAME}</p>
              <p className="text-white/50">(you)</p>
            </div>
          </div>

          <motion.span
            key={cpm}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm font-bold text-cyan-300 backdrop-blur-sm tabular-nums sm:text-base"
          >
            {cpm}
            <span className="ml-1 text-white/60">cpm</span>
          </motion.span>
        </div>

        {/* Animated progress bar */}
        <div
          className="mt-5 h-1.5 overflow-hidden rounded-full border border-white/10 bg-white/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <motion.div
            className={`h-full rounded-full ${
              isFinished
                ? "bg-emerald-400"
                : lowTime
                  ? "bg-gradient-to-r from-amber-400 to-red-500"
                  : darkMode
                    ? "bg-gradient-to-r from-blue-400 to-cyan-300"
                    : "bg-gradient-to-r from-red-400 to-amber-300"
            }`}
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          />
        </div>
      </div>
    </motion.div>
  );
}
