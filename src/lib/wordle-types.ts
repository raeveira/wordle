export type LetterStatus = "correct" | "misplaced" | "incorrect";

export interface Tile {
  letter: string;
  status: LetterStatus;
}

export interface Word {
  word: string;
  description: string;
}
