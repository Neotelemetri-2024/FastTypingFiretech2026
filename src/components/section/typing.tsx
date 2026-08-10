import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme";
import {
  RaceHeader,
  RaceInput,
  RacePassage,
  RaceStats,
  PlayerNameGate,
  type RaceStatsType,
} from "../typing";
import {
  EASE_OUT,
  getSpeedStats,
  pickRandomRaceText,
  RACE_DURATION,
  RACE_TEXT,
} from "../typing/typing-data";

import ResultModal, { type PracticeScore } from "../../components/modal/result";
import { loadMyScores, saveMyScore } from "../../lib/myScores";

/** Section id used to scroll into view when "Start Typing" is clicked. */
export const TYPING_SECTION_ID = "typing-section";

export default function Typing() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RACE_DURATION);
  const [started, setStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState<PracticeScore[]>(() =>
    loadMyScores().slice(0, 3),
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const hasShownResult = useRef(false);

  const isFinished = secondsLeft <= 0 || input.length >= RACE_TEXT.length;

  useEffect(() => {
    if (!started || isFinished) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [started, isFinished]);

  const elapsed = RACE_DURATION - secondsLeft;

  // Formula ala monkeytype: net WPM (karakter benar), raw WPM (semua ketikan),
  // dan accuracy dari kecocokan per posisi karakter. `getSpeedStats` adalah
  // satu-satunya sumber kebenaran statistik race.
  const { wpm, accuracy } = useMemo(
    () => getSpeedStats(input, elapsed),
    [input, elapsed],
  );

  const progress = Math.min((input.length / RACE_TEXT.length) * 100, 100);

  const stats: RaceStatsType = { progress, accuracy };
  useEffect(() => {
    if (!started || !isFinished || hasShownResult.current) return;

    hasShownResult.current = true;

    const updated = saveMyScore({
      name: playerName,
      speed: wpm,
      accuracy,
      time: `${elapsed}s`,
    });
    setScores(updated.slice(0, 3));

    requestAnimationFrame(() => {
      setShowResult(true);
    });
  }, [started, isFinished, wpm, accuracy, elapsed, playerName]);

  const handleNameSubmit = (name: string) => {
    pickRandomRaceText();
    setPlayerName(name);
    setStarted(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleRestart = () => {
    hasShownResult.current = false;

    pickRandomRaceText();
    setInput("");
    setSecondsLeft(RACE_DURATION);
    setShowResult(false);

    inputRef.current?.focus();
  };

  return (
    <section
      id={TYPING_SECTION_ID}
      className="relative mx-auto max-w-5xl px-4 pt-32 pb-20 sm:px-6 md:pt-28"
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="mb-10 text-center"
      >
        <span
          className={`inline-block rounded-full border px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase ${
            darkMode
              ? "border-slate-300 bg-white/60 text-slate-600"
              : "border-white/15 bg-white/5 text-slate-300"
          }`}
        >
          Live Race
        </span>
        <h2
          className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl ${
            darkMode ? "text-slate-900" : "text-white"
          }`}
        >
          Speed Challenge
        </h2>
        <div
          className={`mx-auto mt-4 h-1 w-20 rounded-full ${
            darkMode ? "bg-blue-600" : "bg-red-600"
          }`}
        />
      </motion.div>

      {/* Race card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className={`overflow-hidden rounded-3xl border shadow-2xl transition-colors duration-300 ${
          darkMode
            ? "border-slate-200 bg-white shadow-black/15"
            : "border-white/10 bg-white/5 shadow-black/30"
        }`}
      >
        <RaceHeader
          playerName={playerName}
          secondsLeft={secondsLeft}
          wpm={wpm}
          progress={progress}
          isFinished={isFinished}
        />

        <div className="p-6 sm:p-8">
          {started ? (
            <>
              <RacePassage input={input} disabled={isFinished} />

              <RaceInput
                value={input}
                disabled={isFinished}
                onChange={setInput}
                inputRef={inputRef}
              />

              <div className="mt-6">
                <RaceStats stats={stats} />
              </div>
            </>
          ) : (
            <PlayerNameGate onSubmit={handleNameSubmit} />
          )}
        </div>
      </motion.div>
      <ResultModal
        open={showResult}
        scores={scores}
        maxScores={3}
        onTryAgain={() => {
          setShowResult(false);
          handleRestart();
        }}
        onDone={() => {
          setShowResult(false);
          navigate("/score");
        }}
      />
    </section>
  );
}
