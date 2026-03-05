import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LetterStatus } from "@/lib/wordle-types";

/**
 * Combines multiple Tailwind CSS class names using clsx and merges conflicting utilities
 * Resolves Tailwind CSS class conflicts by keeping the last declaration
 * @function cn
 * @param {...ClassValue[]} inputs - CSS class names or conditional class objects
 * @returns {string} Merged and conflict-resolved CSS class string
 * @example
 * cn("px-2", "px-4") // Returns "px-4"
 * cn("bg-red-500", condition && "bg-blue-500") // Conditionally merges classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Maps each letter status to its corresponding Tailwind CSS styling classes
 * Used to apply visual styling to tiles based on their validation status
 * @type {Record<LetterStatus, string>}
 * @property {string} correct - Green background for correctly placed letters
 * @property {string} misplaced - Amber/yellow background for letters in wrong position
 * @property {string} incorrect - Red background for letters not in the word
 */
export const statusStyles: Record<LetterStatus, string> = {
  correct: "bg-green-300 border-green-300 text-gray-900 hover:bg-green-400",
  misplaced: "bg-amber-300 border-amber-300 text-gray-900 hover:bg-amber-400",
  incorrect: "bg-red-300 border-red-300 text-gray-900 hover:bg-red-400",
};
