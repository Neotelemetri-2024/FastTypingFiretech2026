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
    // Input tetap aktif untuk menangkap ketikan, tapi disembunyikan — feedback visual sudah ada di RacePassage.
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(event) =>
        onChange(event.target.value.slice(0, MAX_INPUT_LENGTH))
      }
      onPaste={handlePaste}
      disabled={disabled}
      aria-label="Typing area"
      className="sr-only"
    />
  );
}
