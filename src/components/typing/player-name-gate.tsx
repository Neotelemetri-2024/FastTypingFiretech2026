import { useState } from "react";
import { motion } from "framer-motion";
import { Flag, User } from "lucide-react";
import { useTheme } from "../../context/theme";
import { EASE_OUT } from "./typing-data";

type PlayerNameGateProps = {
  onSubmit: (name: string) => void;
};

/** Blocks the race until the player enters a name — the timer only starts once submitted. */
export default function PlayerNameGate({ onSubmit }: PlayerNameGateProps) {
  const { darkMode } = useTheme();
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="flex flex-col items-center py-6 text-center"
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${
          darkMode
            ? "bg-blue-100 text-blue-600 shadow-blue-600/20"
            : "bg-red-500/15 text-red-500 shadow-red-600/20"
        }`}
      >
        <User className="h-7 w-7" />
      </span>

      <h3
        className={`mt-4 text-xl font-extrabold tracking-tight ${
          darkMode ? "text-slate-900" : "text-white"
        }`}
      >
        Enter your name to start the race
      </h3>
      <p
        className={`mt-1 text-sm ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        The timer won't start until you're ready.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex w-full max-w-sm flex-col gap-3 sm:flex-row"
      >
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={24}
          placeholder="Your name..."
          aria-label="Player name"
          className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-all duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className={`inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            darkMode
              ? "bg-blue-600 shadow-blue-600/30 hover:bg-blue-700"
              : "bg-red-600 shadow-red-600/30 hover:bg-red-700"
          }`}
        >
          <Flag className="h-4 w-4" />
          Start Race
        </button>
      </form>
    </motion.div>
  );
}
