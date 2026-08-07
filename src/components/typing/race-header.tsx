import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/theme";
import { EASE_OUT, formatTime } from "./typing-data";
import progresImg from "../../assets/progres.webp";

type RaceHeaderProps = {
  playerName: string;
  secondsLeft: number;
  wpm: number;
  progress: number;
  isFinished: boolean;
};

const LOW_TIME_THRESHOLD = 10;
// Keeps the runner's center within the dedicated track lane, clear of its own edges.
const RUNNER_TRACK_MIN = 3;
const RUNNER_TRACK_MAX = 97;

export default function RaceHeader({
  playerName,
  secondsLeft,
  wpm,
  progress,
  isFinished,
}: RaceHeaderProps) {
  const { darkMode } = useTheme();
  const lowTime = secondsLeft <= LOW_TIME_THRESHOLD && !isFinished;
  // Faster WPM = quicker run cycle; idles slowly at 0 wpm, caps out near max speed.
  const runDuration = Math.max(0.35, 1.4 - wpm / 60);
  const isRunning = wpm > 0 && !isFinished;

  // Only ever advances, so a temporary wpm/progress dip (e.g. a backspace) never sends the runner backwards.
  const [maxProgress, setMaxProgress] = useState(progress);
  if (progress > maxProgress) {
    setMaxProgress(progress);
  }

  const runnerLeft =
    RUNNER_TRACK_MIN +
    (Math.min(maxProgress, 100) / 100) * (RUNNER_TRACK_MAX - RUNNER_TRACK_MIN);

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
            <span className="font-bold text-white/70">
              Type the text below:
            </span>
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
          <div className="text-sm font-semibold sm:text-base">
            <p>{playerName || "Waiting for name..."}</p>
            <p className="text-white/50">(you)</p>
          </div>

          <motion.span
            key={wpm}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm font-bold text-cyan-300 backdrop-blur-sm tabular-nums sm:text-base"
          >
            {wpm}
            <span className="ml-1 text-white/60">wpm</span>
          </motion.span>
        </div>

        {/* Runner track — a dedicated dashed lane so the runner never overlaps the name/wpm row. */}
        <div className="relative mt-4 h-10 border-b border-dashed border-white/15">
          <motion.div
            initial={{ left: `${RUNNER_TRACK_MIN}%` }}
            animate={{ left: `${runnerLeft}%` }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="pointer-events-none absolute bottom-0 z-10 -translate-x-1/2"
          >
            <motion.img
              src={progresImg}
              alt="Player runner"
              className="h-12 w-12 object-contain"
              animate={
                isRunning
                  ? {
                      y: [0, -6, 0, -3, 0],
                      rotate: [0, 10, 0, -10, 0],
                      scaleY: [1, 0.96, 1, 0.98, 1],
                    }
                  : { y: 0, rotate: 0, scaleY: 1 }
              }
              transition={{
                duration: runDuration,
                repeat: isRunning ? Infinity : 0,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            />
          </motion.div>
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
                  ? "bg-linear-to-r from-amber-400 to-red-500"
                  : darkMode
                    ? "bg-linear-to-r from-blue-400 to-cyan-300"
                    : "bg-linear-to-r from-red-400 to-amber-300"
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
