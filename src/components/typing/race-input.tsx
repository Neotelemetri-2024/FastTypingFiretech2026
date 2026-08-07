import { Keyboard } from "lucide-react";

type RaceInputProps = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

/** Panjang maksimum input; RACE_TEXT maksimal sepanjang ini, jadi ketikan lebih tidak menambah skor. */
const MAX_INPUT_LENGTH = 350;

export default function RaceInput({
  value,
  disabled,
  onChange,
  inputRef,
}: RaceInputProps) {
  const handlePaste = (event: React.ClipboardEvent) => {
    // Blokir paste — alan monkeytype, skor hanya berasal dari ketikan asli.
    event.preventDefault();
  };

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
          onChange={(event) => onChange(event.target.value.slice(0, MAX_INPUT_LENGTH))}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder="Type here..."
          aria-label="Typing area"
          className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-3.5 pr-4 pl-12 text-slate-900 transition-all duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </div>
  );
}
