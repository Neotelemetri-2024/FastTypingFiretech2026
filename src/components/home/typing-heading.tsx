import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/theme";
import {
  HEADING_TEXT,
  TOTAL_TYPING_DURATION,
  buildCharDelays,
  caretVariants,
  charVariants,
} from "./home-data";

/** The "FAST TYPING" heading — characters type out under a blinking caret. */
export default function TypingHeading() {
  const { darkMode } = useTheme();
  const charDelays = useMemo(() => buildCharDelays(HEADING_TEXT), []);

  return (
    <h1
      className={`relative text-5xl font-extrabold tracking-tight sm:text-6xl ${
        darkMode ? "text-slate-900" : "text-white"
      }`}
    >
      {/* Soft glow that blooms in once typing finishes */}
      <motion.span
        aria-hidden="true"
        className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: TOTAL_TYPING_DURATION, duration: 1.2, ease: "easeOut" }}
        style={{
          background: darkMode
            ? "radial-gradient(ellipse at center, rgba(37,99,235,0.22), transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(220,38,38,0.22), transparent 70%)",
        }}
      />

      {HEADING_TEXT.split("").map((char, index) => (
        <motion.span
          key={index}
          custom={charDelays[index]}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}

      {/* Caret — outer span handles positioning, inner spans the blink squash */}
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.8em] w-0.75 translate-y-[0.12em] align-middle"
      >
        <motion.span
          variants={caretVariants}
          animate="blink"
          className="block h-full w-full origin-bottom rounded-full bg-current shadow-[0_0_12px_currentColor]"
        />
      </span>
    </h1>
  );
}
