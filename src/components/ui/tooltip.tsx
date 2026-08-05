import type { ReactNode } from "react";

type TooltipProps = {
  text: string;
  children: ReactNode;
  position?: "top" | "bottom";
};

export default function Tooltip({
  text,
  children,
  position = "bottom",
}: TooltipProps) {
  const isTop = position === "top";

  return (
    <div className="group relative inline-flex overflow-visible">
      {children}

      <div
        className={`
          pointer-events-none
          absolute
          left-1/2
          z-9999
          whitespace-nowrap
          rounded-lg
          bg-slate-900/95
          px-3
          py-1.5
          text-[11px]
          font-semibold
          text-white
          shadow-xl
          backdrop-blur-md
          opacity-0
          transition-all
          duration-200
          -translate-x-1/2
          ${
            isTop
              ? "bottom-full mb-3 group-hover:-translate-y-1"
              : "top-full mt-3 group-hover:translate-y-1"
          }
          group-hover:opacity-100
        `}
      >
        {text}

        <div
          className={`
            absolute
            left-1/2
            h-2
            w-2
            -translate-x-1/2
            rotate-45
            bg-slate-900

            ${isTop ? "-bottom-1" : "-top-1"}
          `}
        />
      </div>
    </div>
  );
}
