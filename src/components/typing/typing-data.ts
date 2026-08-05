export const RACE_TEXT =
  "Dini memiliki kendala dalam menyelesaikan tugasnya. Ia ingin mempunyai sebuah website yang bisa mengelola semua tugasnya agar tidak ada satupun tugas yang terlewat untuk dikerjakan. Untuk itu, Dini meminta Neo Telemetri untuk membuatkan sebuah website yang mampu mengelola kumpulan tugas tersebut.";

export const RACE_DURATION = 59;
export const PLAYER_NAME = "Mingyu";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

/** Count typed vs. correctly typed characters for accuracy + CPM. */
export function countStats(input: string): {
  typedChars: number;
  correctChars: number;
} {
  const words = RACE_TEXT.split(" ");
  const typed = input.split(" ");

  let typedChars = 0;
  let correctChars = 0;

  typed.forEach((typedWord, index) => {
    const expected = words[index];
    if (!expected) return;
    typedChars += typedWord.length;
    for (let i = 0; i < Math.min(typedWord.length, expected.length); i++) {
      if (typedWord[i] === expected[i]) correctChars++;
    }
  });

  return { typedChars, correctChars };
}

export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
