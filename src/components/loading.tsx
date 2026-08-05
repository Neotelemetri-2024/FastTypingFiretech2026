import { motion } from "framer-motion";
import logo from "../assets/firetech.webp";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-9999 overflow-hidden"
      style={{
        background: `
    radial-gradient(circle at 20% 15%, rgba(220,38,38,.35) 0%, transparent 45%),
    radial-gradient(circle at 80% 85%, rgba(37,99,235,.35) 0%, transparent 45%),
    radial-gradient(circle at center, rgba(6,182,212,.08) 0%, transparent 55%),
    linear-gradient(180deg,#020617 0%,#0f172a 60%,#1e293b 100%)
  `,
      }}
    >
      {/* Fixed Background decorations dengan blur gradient effects */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        {/* Cyan gradient blob - top left */}
        <div className="absolute left-0 top-0 h-100 w-100 rounded-full bg-cyan-500/10 blur-[160px]" />

        {/* Blue gradient blob - bottom right */}
        <div className="absolute right-0 bottom-0 h-125 w-125 rounded-full bg-blue-500/10 blur-[170px]" />

        {/* Grid pattern overlay - subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      {/* Glow */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 blur-[150px]"
      />

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src={logo}
          initial={{
            opacity: 0,
            filter: "blur(20px)",
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
          }}
          transition={{
            duration: 1.4,
          }}
          className="w-28"
        />
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        <p className="tracking-[8px] text-cyan-300">INITIALIZING</p>
      </motion.div>
    </motion.div>
  );
}
