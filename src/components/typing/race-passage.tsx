import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getWordStatuses, type StatusWord } from "./typing-data";

const WORD_CLASSES: Record<StatusWord["state"], string> = {
  correct: "text-emerald-600",
  wrong: "text-red-500 bg-red-500/10 rounded",
  current: "bg-amber-100 text-slate-900 border-b-2 border-amber-500",
  upcoming: "text-slate-400",
};

const CURRENT_ITEM_ID = "typing-current-word";
const PASSAGE_HEIGHT_CLASS = "max-h-48";

type RacePassageProps = {
  input: string;
  disabled: boolean;
};

export default function RacePassage({ input, disabled }: RacePassageProps) {
  const currentRef = useRef<HTMLSpanElement>(null);
  const words = getWordStatuses(input);

  /** Keep the active word in view — auto-scroll happens inside the card only. */
  useEffect(() => {
    currentRef.current?.scrollIntoView({
      block: "center",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [input]);

  return (
    <div className="relative">
      <p
        className={`relative z-10 overflow-y-auto pr-1 text-lg leading-loose sm:text-xl ${PASSAGE_HEIGHT_CLASS}`}
        style={{ scrollbarWidth: "thin" }}
      >
        {words.map((word, index) => {
          const isCurrent = word.state === "current";
          return (
            <span key={`${word.text}-${index}`}>
              <motion.span
                ref={isCurrent ? currentRef : undefined}
                id={isCurrent ? CURRENT_ITEM_ID : undefined}
                className={`rounded px-0.5 transition-colors duration-150 ${WORD_CLASSES[word.state]}`}
                layout
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              >
                {word.text}
              </motion.span>
              {index < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </p>

      {/* Scroll hint — fades in after a few words */}
      {input.length > 40 && !disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pointer-events-none absolute -top-5 left-1/2 z-10 -translate-x-1/2"
        >
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-[10px] font-semibold tracking-wide text-slate-500 uppercase shadow-sm">
            Autoscroll on
          </span>
        </motion.div>
      )}
    </div>
  );
}
