import { motion } from "framer-motion";
import { useTheme } from "../../context/theme";
import { TABS, EASE_OUT, type ScoreTab } from "./score-data";

type ScoreTabsProps = {
  tab: ScoreTab;
  onChange: (tab: ScoreTab) => void;
};

export default function ScoreTabs({ tab, onChange }: ScoreTabsProps) {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: EASE_OUT }}
      className="mb-5 flex flex-wrap gap-3"
    >
      {TABS.map(({ id, label, icon: Icon }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`relative flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
              active
                ? "text-white"
                : darkMode
                  ? "border border-slate-200 text-slate-600 hover:bg-white/60 hover:text-slate-900"
                  : "border border-white/15 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="score-tab-pill"
                className={`absolute inset-0 rounded-xl shadow-lg ${
                  darkMode
                    ? "bg-blue-600 shadow-blue-600/30"
                    : "bg-red-600 shadow-red-600/30"
                }`}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <Icon className="relative z-10 h-4 w-4" />
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </motion.div>
  );
}
