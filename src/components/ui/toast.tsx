import { useEffect } from "react";
import { CheckCircle2, CircleX, X } from "lucide-react";

/* ─────────── Types & Props ─────────── */

export type ToastType = "success" | "error";

export type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  /** Visual tone of the toast. Defaults to "success". */
  type?: ToastType;
  /** How long (ms) before the toast auto-dismisses. */
  duration?: number;
};

/* ─────────── Constants ─────────── */

const DEFAULT_DURATION = 3000;

/* ─────────── Main Component ─────────── */

export default function Toast({
  open,
  message,
  onClose,
  type = "success",
  duration = DEFAULT_DURATION,
}: ToastProps) {
  /* Auto-dismiss after the given duration */
  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const isSuccess = type === "success";

  const iconCircleClass = isSuccess
    ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
    : "border-red-400/40 bg-red-500/15 text-red-400 shadow-[0_0_24px_rgba(239,68,68,0.35)]";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 top-4 z-10000 w-[calc(100%-2rem)] max-w-md sm:right-6 sm:top-24"
      style={{
        animation: "proof-slide-down 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="flex items-center gap-3 overflow-hidden rounded-2xl border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.08)_100%)] py-3 pl-4 pr-3 text-white shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${iconCircleClass}`}
          style={{
            animation:
              "proof-zoom-in 0.35s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <CircleX className="h-6 w-6" />
          )}
        </div>

        <div
          className="min-w-0 flex-1"
          style={{ animation: "proof-slide-up 0.3s 0.12s ease-out both" }}
        >
          <p className="text-sm font-black uppercase tracking-wide">
            {isSuccess ? "Success" : "Error"}
          </p>
          <p className="mt-0.5 truncate text-sm font-medium text-white/85">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
