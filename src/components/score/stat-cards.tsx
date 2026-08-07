import { motion } from "framer-motion";
import { Flame, Trophy, Zap, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/theme";
import { loadMyScores, subscribeMyScores } from "../../lib/myScores";
import { EASE_OUT } from "./score-data";
import CountUp from "./count-up";

type Stat = { label: string; icon: LucideIcon; value: number; suffix: string };

function computeStats(): Stat[] {
  const scores = loadMyScores();
  const topSpeed = scores.length
    ? Math.max(...scores.map((score) => score.speed))
    : 0;
  const avgSpeed = scores.length
    ? Math.round(
        scores.reduce((total, score) => total + score.speed, 0) / scores.length,
      )
    : 0;

  return [
    { label: "Total Races", icon: Trophy, value: scores.length, suffix: "" },
    { label: "Top Speed", icon: Zap, value: topSpeed, suffix: " WPM" },
    { label: "Average Speed", icon: Flame, value: avgSpeed, suffix: " WPM" },
  ];
}

export default function StatCards() {
  const { darkMode } = useTheme();
  const [stats, setStats] = useState<Stat[]>(() => computeStats());

  useEffect(() => {
    const refresh = () => setStats(computeStats());
    return subscribeMyScores(refresh);
  }, []);

  return (
    <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-5">
      {stats.map(({ label, icon: Icon, value, suffix }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 0.35 + index * 0.1,
            duration: 0.6,
            ease: EASE_OUT,
          }}
          whileHover={{
            y: -4,
            scale: 1.02,
            transition: { type: "spring", stiffness: 240, damping: 18 },
          }}
          className={`relative overflow-hidden rounded-2xl border p-3 backdrop-blur-sm sm:p-5 ${
            darkMode
              ? "border-slate-200 bg-white/60"
              : "border-white/10 bg-white/5"
          }`}
        >
          {/* Corner glow */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -top-6 -right-6 h-16 w-16 rounded-full blur-2xl ${
              darkMode ? "bg-blue-500/15" : "bg-red-500/15"
            }`}
          />

          <div className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-lg sm:h-9 sm:w-9 ${
                darkMode
                  ? "bg-blue-100 text-blue-600"
                  : "bg-red-500/15 text-red-500"
              }`}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
            </span>
            <p
              className={`text-[10px] font-semibold tracking-wide uppercase sm:text-xs ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              {label}
            </p>
          </div>

          <p
            className={`mt-2 text-xl font-extrabold tabular-nums sm:mt-3 sm:text-3xl ${
              darkMode ? "text-slate-900" : "text-white"
            }`}
          >
            <CountUp value={value} />
            <span
              className={`ml-1 text-xs font-bold sm:text-sm ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {suffix}
            </span>
          </p>
        </motion.div>
      ))}
    </div>
  );
}
