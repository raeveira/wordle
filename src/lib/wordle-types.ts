/**
 * Represents the validation status of a guessed letter in Wordle
 * @typedef {"correct" | "misplaced" | "incorrect"} LetterStatus
 * @property {string} correct - Letter is in the correct position
 * @property {string} misplaced - Letter exists in the word but wrong position
 * @property {string} incorrect - Letter not in the target word
 */
export type LetterStatus = "correct" | "misplaced" | "incorrect";

/**
 * Represents a single tile/cell in the Wordle game grid
 * @typedef {Object} Tile
 * @property {string} letter - The letter character displayed in the tile
 * @property {LetterStatus} status - The validation status of this letter
 */
export interface Tile {
  letter: string;
  status: LetterStatus;
}

/**
 * Represents a word from the game's word database
 * @typedef {Object} Word
 * @property {string} word - The actual word string
 * @property {string} description - The definition or description of the word
 */
export interface Word {
  word: string;
  description: string;
}
