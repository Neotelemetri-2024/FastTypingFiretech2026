import { type MotionProps, type Variants } from "framer-motion";

/* ─────────── Heading ─────────── */

export const HEADING_TEXT = "FAST TYPING";

/* ─────────── Typing tuning ─────────── */

export const CHAR_REVEAL_DURATION = 0.32;
export const CHAR_DELAY = 0.075;
export const SPACE_PAUSE = 0.22;
export const JITTER = 0.02;

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const TOTAL_TYPING_DURATION =
  HEADING_TEXT.length * CHAR_DELAY +
  SPACE_PAUSE * (HEADING_TEXT.split(" ").length - 1) +
  CHAR_REVEAL_DURATION +
  0.2;

/** Per-character stagger delays, with a natural pause after spaces and slight jitter. */
export function buildCharDelays(text: string): number[] {
  const delays: number[] = [];
  let elapsed = 0.12;
  for (let i = 0; i < text.length; i++) {
    delays.push(elapsed + Math.random() * JITTER);
    elapsed += text[i] === " " ? CHAR_DELAY + SPACE_PAUSE : CHAR_DELAY;
  }
  return delays;
}

/* ─────────── Motion variants ─────────── */

/** Characters rise out of a soft blur and settle — like letters appearing under a caret. */
export const charVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(7px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: CHAR_REVEAL_DURATION, ease: EASE_OUT },
  }),
};

/** Smooth vertical squash blink for the caret. */
export const caretVariants: Variants = {
  blink: {
    opacity: [1, 1, 0.05, 0.05],
    scaleY: [1, 1, 0.5, 0.5],
    transition: {
      duration: 1.1,
      times: [0, 0.55, 0.82, 1],
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/** Shared reveal for the supporting content. */
export const reveal = (delay: number): MotionProps => ({
  initial: { opacity: 0, y: 18, filter: "blur(5px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay, duration: 0.65, ease: EASE_OUT },
});

/* ─────────── Illustration ─────────── */

/** Decorative floating keycaps orbiting the illustration. */
export const FLOAT_KEYS = [
  { label: "A", position: "left-[3%] top-[12%] h-10 w-10", delay: 0, duration: 3.8 },
  { label: "F", position: "right-[4%] top-[2%] h-12 w-12", delay: 0.9, duration: 4.4 },
  { label: "T", position: "left-[8%] bottom-[14%] h-9 w-9", delay: 1.7, duration: 4 },
  { label: "26", position: "right-[0%] bottom-[20%] h-11 w-11", delay: 0.5, duration: 4.8 },
];

/** Shared idle float timing for the image, glow and floor shadow. */
export const FLOAT_DURATION = 5.5;
