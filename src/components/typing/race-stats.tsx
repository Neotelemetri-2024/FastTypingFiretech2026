import { motion } from "framer-motion";
import { CheckCircle2, Target } from "lucide-react";
import { useTheme } from "../../context/theme";

export type RaceStats = {
  progress: number;
  accuracy: number;
};

const STAT_ITEMS = [
  { key: "progress", label: "Progress", icon: Target, barClass: "bg-red-500" },
  {
    key: "accuracy",
    label: "Accuracy",
    icon: CheckCircle2,
    barClass: "bg-emerald-400",
  },
] as const;

type RaceStatsProps = {
  stats: RaceStats;
};

/** Compact progress + accuracy readout shown next to the typing card. */
export default function RaceStats({ stats }: RaceStatsProps) {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-col gap-3">
      {STAT_ITEMS.map(({ key, label, icon: Icon, barClass }) => {
        const value = stats[key];
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-3 rounded-2xl border p-4 backdrop-blur-sm transition-colors duration-300 ${
              darkMode
                ? "border-slate-200 bg-white/70"
                : "border-white/10 bg-white/5"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                darkMode
                  ? "bg-slate-100 text-slate-700"
                  : "bg-red-500/15 text-red-500"
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p
                  className={`text-[11px] font-semibold tracking-wider uppercase ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {label}
                </p>
                <p
                  className={`text-lg font-extrabold tabular-nums ${
                    darkMode ? "text-slate-900" : "text-white"
                  }`}
                >
                  {Math.round(value)}
                  <span
                    className={`ml-0.5 text-xs font-bold ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    %
                  </span>
                </p>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
                <motion.div
                  className={`h-full rounded-full ${barClass}`}
                  initial={false}
                  animate={{ width: `${Math.min(value, 100)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
