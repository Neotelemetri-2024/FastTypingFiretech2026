/** Kumpulan teks race — satu dipilih acak setiap kali race dimulai/diulang. */
export const RACE_TEXTS = [
  "Dini memiliki kendala dalam menyelesaikan tugasnya. Ia ingin mempunyai sebuah website yang bisa mengelola semua tugasnya agar tidak ada satupun tugas yang terlewat untuk dikerjakan. Untuk itu, Dini meminta Neo Telemetri untuk membuatkan sebuah website yang mampu mengelola kumpulan tugas tersebut.",
  "Rian sering lupa jadwal rapat pentingnya. Ia membutuhkan sebuah aplikasi yang mampu mengingatkan setiap agenda secara otomatis agar tidak ada satupun jadwal yang terlewat. Karena itu, Rian meminta Neo Telemetri untuk merancang sebuah aplikasi pengingat yang praktis dan mudah digunakan setiap hari.",
  "Sari ingin belajar mengetik dengan lebih cepat dan akurat. Ia mencari sebuah platform latihan yang bisa mengukur kecepatan serta ketepatan ketikannya secara real time. Untuk itu, Sari meminta Neo Telemetri untuk membangun sebuah website latihan mengetik yang seru dan menantang untuk semua pengguna.",
  "Budi mengelola sebuah toko online kecil miliknya sendiri. Ia memerlukan sistem yang dapat mencatat stok barang dan pesanan pelanggan secara rapi. Oleh karena itu, Budi meminta Neo Telemetri untuk mengembangkan sebuah aplikasi manajemen toko yang sederhana namun tetap lengkap dan mudah dipahami.",
  "Lina baru saja pindah ke kota yang benar-benar asing baginya. Ia butuh sebuah peta digital yang menunjukkan lokasi penting seperti rumah sakit dan sekolah terdekat. Karena itu, Lina meminta Neo Telemetri untuk menciptakan sebuah aplikasi peta interaktif yang informatif bagi warga baru di kota tersebut.",
  "Andi berencana menabung untuk membeli laptop baru tahun depan. Ia ingin mempunyai sebuah aplikasi yang mampu mencatat pemasukan dan pengeluaran hariannya dengan rapi. Untuk itu, Andi meminta Neo Telemetri untuk merancang sebuah aplikasi keuangan pribadi yang ringan dan menyenangkan digunakan setiap hari.",
  "Maya adalah seorang guru yang ingin murid-muridnya lebih semangat belajar. Ia menginginkan sebuah kuis daring yang bisa dikerjakan kapan saja dari rumah masing-masing. Karena itu, Maya meminta Neo Telemetri untuk membuatkan sebuah platform kuis interaktif yang menyenangkan dan mudah diakses semua orang.",
] as const;

function getRandomRaceText(exclude?: string): string {
  const pool = RACE_TEXTS.filter((text) => text !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Teks race yang sedang aktif; live binding — berubah lewat `pickRandomRaceText`. */
export let RACE_TEXT: string = getRandomRaceText();

/** Pilih teks baru secara acak (tidak sama dengan yang sedang berjalan) untuk race berikutnya. */
export function pickRandomRaceText(): string {
  RACE_TEXT = getRandomRaceText(RACE_TEXT);
  return RACE_TEXT;
}

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
