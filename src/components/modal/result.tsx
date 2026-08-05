import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText } from "lucide-react";

export type PracticeScore = {
  race: number;
  speed: number;
  accuracy: number;
  time: string;
};

type ResultModalProps = {
  open: boolean;
  scores: PracticeScore[];
  maxScores?: number;
  onTryAgain: () => void;
  onDone: () => void;
};

export default function ResultModal({
  open,
  scores,
  maxScores = 3,
  onTryAgain,
  onDone,
}: ResultModalProps) {
  const [limitReached, setLimitReached] = useState(false);
  const [wasOpen, setWasOpen] = useState(open);

  // Reset back to the score summary view whenever the modal is reopened.
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setLimitReached(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg rounded-2xl border-2 border-blue-500 bg-white p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <FileText className="h-4.5 w-4.5" />
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Your Latest Practice Scores
              </h2>
            </div>

            {/* Table */}
            <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="bg-linear-to-r from-blue-700 to-blue-900 text-white">
                    <th className="px-3 py-2.5 font-semibold">Race</th>
                    <th className="px-3 py-2.5 font-semibold">Speed</th>
                    <th className="px-3 py-2.5 font-semibold">Accuracy</th>
                    <th className="px-3 py-2.5 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <tr
                      key={score.race}
                      className={
                        index < scores.length - 1
                          ? "border-b border-slate-200"
                          : ""
                      }
                    >
                      <td className="px-3 py-2.5 text-slate-700">
                        {score.race}
                      </td>
                      <td className="px-3 py-2.5 text-slate-700">
                        {score.speed} cpm
                      </td>
                      <td className="px-3 py-2.5 text-slate-700">
                        {score.accuracy}%
                      </td>
                      <td className="px-3 py-2.5 text-slate-700">
                        {score.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              {limitReached
                ? "You have reached the trial limit"
                : `Save up to ${maxScores} practise scores for everyone. Try again?`}
            </p>

            {/* Actions */}
            <div className="mt-4 flex gap-3">
              {limitReached ? (
                <button
                  type="button"
                  onClick={onDone}
                  className="cursor-pointer rounded-lg bg-indigo-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-950"
                >
                  Check my scores
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onTryAgain}
                    className="cursor-pointer rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-500"
                  >
                    Try again
                  </button>
                  <button
                    type="button"
                    onClick={() => setLimitReached(true)}
                    className="cursor-pointer rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                  >
                    Done
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
