import { motion } from "framer-motion";
import { useTheme } from "../../context/theme";
import { EASE_OUT, FLOAT_KEYS } from "./home-data";

/** Decorative keycaps orbiting the illustration at their own relaxed pace. */
export default function FloatingKeycaps() {
  const { darkMode } = useTheme();

  return (
    <>
      {FLOAT_KEYS.map((key) => (
        <motion.span
          key={key.label}
          aria-hidden="true"
          className={`absolute z-10 flex items-center justify-center rounded-lg border-[1.5px] font-extrabold shadow-lg select-none ${key.position} ${
            darkMode
              ? "border-slate-300 bg-white/90 text-blue-600 shadow-slate-900/30"
              : "border-white/40 bg-black/80 text-red-500 shadow-black/30"
          }`}
          initial={{ opacity: 0, y: 24, rotate: -12, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ delay: 0.7 + key.delay, duration: 0.6, ease: EASE_OUT }}
        >
          <motion.span
            className="block text-[0.8em] leading-none"
            animate={{
              y: [0, -12, 0],
              rotateZ: [
                key.delay % 2 === 0 ? -6 : 6,
                key.delay % 2 === 0 ? 6 : -6,
                key.delay % 2 === 0 ? -6 : 6,
              ],
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
