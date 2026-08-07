export const RACE_TEXT =
  "Dini memiliki kendala dalam menyelesaikan tugasnya. Ia ingin mempunyai sebuah website yang bisa mengelola semua tugasnya agar tidak ada satupun tugas yang terlewat untuk dikerjakan. Untuk itu, Dini meminta Neo Telemetri untuk membuatkan sebuah website yang mampu mengelola kumpulan tugas tersebut.";

export const RACE_DURATION = 59;

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Panjang standar satu "kata" untuk metrik WPM (konvensi internasional). */
export const CHARS_PER_WORD = 5;

export type WordState = "correct" | "wrong" | "current" | "upcoming";

export type StatusWord = { text: string; state: WordState };

/** Tag every word of the passage with its live race state. */
export function getWordStatuses(input: string): StatusWord[] {
  const words = RACE_TEXT.split(" ");
  const typed = input.split(" ");

  return words.map((text, index) => {
    if (index < typed.length - 1) {
      return { text, state: typed[index] === text ? "correct" : "wrong" };
    }
    return { text, state: index === typed.length - 1 ? "current" : "upcoming" };
  });
}

/**
 * Hitung statistik pengetikan ala monkeytype — per posisi karakter,
 * bukan per kata. Setiap karakter dibandingkan dengan karakter target
 * pada indeks yang sama (spasi ikut dihitung). Karakter yang diketik
 * melebihi panjang teks otomatis dianggap salah.
 */
export function countStats(input: string): {
  typedChars: number;
  correctChars: number;
} {
  let typedChars = 0;
  let correctChars = 0;

  for (let i = 0; i < input.length; i++) {
    typedChars++;
    if (input[i] === RACE_TEXT[i]) correctChars++;
  }

  return { typedChars, correctChars };
}

export type SpeedStats = {
  /** Kecepatan bersih: hanya karakter yang benar. 1 kata = 5 karakter. */
  wpm: number;
  /** Kecepatan mentah: semua karakter yang diketik, termasuk yang salah. */
  rawWpm: number;
  /** CPM = WPM × 5. */
  cpm: number;
  /** Persentase karakter yang benar dari total yang diketik. */
  accuracy: number;
};

/**
 * Formula kecepatan standar: `(jumlahKarakter / 5) / menitBerjalan`.
 * Tidak memakai floor pada waktu — sama seperti monkeytype, metrik
 * langsung terlihat realistis sejak detik pertama.
 */
export function getSpeedStats(
  input: string,
  elapsedSeconds: number,
): SpeedStats {
  if (input.length === 0 || elapsedSeconds <= 0) {
    return { wpm: 0, rawWpm: 0, cpm: 0, accuracy: 100 };
  }

  const { typedChars, correctChars } = countStats(input);
  const minutes = elapsedSeconds / 60;

  const rawWpm = Math.round(typedChars / CHARS_PER_WORD / minutes);
  const wpm = Math.round(correctChars / CHARS_PER_WORD / minutes);
  const accuracy = Math.round((correctChars / typedChars) * 100);

  return { wpm, rawWpm, cpm: wpm * CHARS_PER_WORD, accuracy };
}

export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
