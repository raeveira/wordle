import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LetterStatus } from "@/lib/wordle-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusStyles: Record<LetterStatus, string> = {
  correct: "bg-green-300 border-green-300 text-gray-900 hover:bg-green-400",
  misplaced: "bg-amber-300 border-amber-300 text-gray-900 hover:bg-amber-400",
  incorrect: "bg-red-300 border-red-300 text-gray-900 hover:bg-red-400",
};
