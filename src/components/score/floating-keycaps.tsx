import { motion } from "framer-motion";
import { FLOAT_KEYS, EASE_OUT } from "./score-data";
import { useTheme } from "../../context/theme";

export default function FloatingKeycaps() {
  const { darkMode } = useTheme();

  return (
    <>
      {FLOAT_KEYS.map((key) => (
        <motion.span
          key={key.label}
          aria-hidden="true"
          className={`pointer-events-none absolute z-0 hidden h-10 w-10 items-center justify-center rounded-lg border font-extrabold select-none md:flex ${key.position} ${
            darkMode
              ? "border-slate-200 bg-white/40 text-blue-600/30"
              : "border-white/10 bg-white/5 text-white/20"
          }`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8 + key.delay,
            duration: 0.6,
            ease: EASE_OUT,
          }}
        >
          <motion.span
            className="block text-[0.8em] leading-none"
            animate={{
              y: [0, -10, 0],
              rotate: [0, key.delay % 2 === 0 ? 8 : -8, 0],
            }}
            transition={{
              duration: key.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: key.delay,
            }}
          >
            {key.label}
          </motion.span>
        </motion.span>
      ))}
    </>
  );
}
