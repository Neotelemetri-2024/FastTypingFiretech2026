import { Keyboard } from "lucide-react";

type RaceInputProps = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export default function RaceInput({
  value,
  disabled,
  onChange,
  inputRef,
}: RaceInputProps) {
  return (
    <div className="relative mt-6">
      <div className="relative">
        <Keyboard
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400"
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          placeholder="Type here..."
          aria-label="Typing area"
          className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-3.5 pr-4 pl-12 text-slate-900 transition-all duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </div>
  );
}
