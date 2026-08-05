import { motion } from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";
import { useTheme } from "../../context/theme";
import TypingHeading from "./typing-heading";
import { reveal } from "./home-data";

type HeroContentProps = {
  contentDelay: number;
  buttonDelay: number;
  onStartTyping: () => void;
};

/** Left column — animated heading, tagline and CTA button. */
export default function HeroContent({
  contentDelay,
  buttonDelay,
  onStartTyping,
}: HeroContentProps) {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl text-center md:text-left"
    >
      <TypingHeading />

      <motion.p
        {...reveal(contentDelay)}
        className={`mt-6 text-base leading-relaxed sm:text-lg ${
          darkMode ? "text-slate-600" : "text-slate-300"
        }`}
      >
        Fast Typing is a speed competition using a computer keyboard. Come test
        your typing speed in the Fast Typing Firetech 2026 competition!
      </motion.p>

      <motion.button
        type="button"
        onClick={onStartTyping}
        {...reveal(buttonDelay)}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className={`group mt-8 inline-flex cursor-pointer items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg ring-1 ring-white/20 transition-shadow duration-300 hover:shadow-xl ${
          darkMode
            ? "bg-blue-600 shadow-blue-600/30 hover:shadow-blue-600/40"
            : "bg-red-600 shadow-red-600/30 hover:shadow-red-600/40"
        }`}
      >
        <Zap className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        Start Typing
        <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      </motion.button>
    </motion.div>
  );
}
