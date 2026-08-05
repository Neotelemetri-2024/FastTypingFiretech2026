import { useState } from "react";
import { motion } from "framer-motion";
import fastTypingImage from "../../assets/fasttyping.webp";
import FloatingKeycaps from "./floating-keycaps";
import { FLOAT_DURATION } from "./home-data";

/** Right column — the keyboard illustration floating with layered glows and shadow. */
export default function HeroIllustration() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative flex w-full max-w-md items-center justify-center md:max-w-lg"
      style={{ perspective: 1200 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow backdrop — continuous breathing, never interrupted */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full bg-blue-500/20 blur-[100px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: FLOAT_DURATION, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glow boost — springs in/out on hover without touching the breathing loop */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full bg-blue-500/25 blur-[100px]"
        initial={false}
        animate={isHovered ? { scale: 1.15, opacity: 0.5 } : { scale: 1, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
      />

      {/* Floor shadow — continuous breathing, never interrupted */}
      <motion.div
        className="absolute bottom-2 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-black/40 blur-2xl"
        animate={{ scaleX: [1, 0.82, 1], opacity: [0.5, 0.32, 0.5] }}
        transition={{ duration: FLOAT_DURATION, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Shadow tighten — springs in/out on hover */}
      <motion.div
        className="absolute bottom-2 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-black/40 blur-2xl"
        initial={false}
        animate={isHovered ? { scaleX: 0.5, opacity: 0.25 } : { scaleX: 1, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      />

      {/* Outer float layer — continuous 3D bobbing, never interrupted by hover */}
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          y: [0, -16, -14, -2, 0],
          rotateX: [0, 3, -3, 1, 0],
          rotateY: [0, -5, 5, -2, 0],
          scale: [1, 1.03, 1.02, 1.01, 1],
        }}
        transition={{
          duration: FLOAT_DURATION,
          times: [0, 0.28, 0.55, 0.8, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner hover layer — smooth spring in both directions (hover in AND out) */}
        <motion.img
          src={fastTypingImage}
          alt="Fast Typing keyboard illustration"
          className="relative w-full cursor-pointer drop-shadow-[0_35px_30px_rgba(0,0,0,0.4)]"
          style={{ transformStyle: "preserve-3d" }}
          animate={
            isHovered
              ? { y: -18, scale: 1.08, rotateX: -8, rotateY: 10, z: 30 }
              : { y: 0, scale: 1, rotateX: 0, rotateY: 0, z: 0 }
          }
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        />
      </motion.div>

      {/* Floating keycaps — orbiting at their own relaxed pace */}
      <FloatingKeycaps />
    </motion.div>
  );
}
