import { useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useTheme } from "../context/theme";
import {
  FloatingKeycaps,
  MyScoreTable,
  ScoreHeader,
  ScoreTable,
  ScoreTabs,
  StatCards,
} from "../components/score";
import type { ScoreTab } from "../components/score/score-data";

export default function Score() {
  const { darkMode } = useTheme();
  const [tab, setTab] = useState<ScoreTab>("latest");

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative mx-auto max-w-5xl overflow-hidden px-6 pt-32 pb-24">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 -top-10 h-80 blur-3xl ${
            darkMode
              ? "bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.14),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.14),transparent_50%)]"
          }`}
        />

        <FloatingKeycaps />

        <div className="relative z-10">
          <ScoreHeader />
          <StatCards />
          <ScoreTabs tab={tab} onChange={setTab} />

          <AnimatePresence mode="wait" initial={false}>
            {tab === "latest" ? <ScoreTable /> : <MyScoreTable />}
          </AnimatePresence>
        </div>
      </section>
    </MotionConfig>
  );
}
