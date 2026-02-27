import { cn, statusStyles } from "@/lib/utils";
import type { LetterStatus } from "@/lib/wordle-types";

interface WordleTileProps {
  letter: string;
  status: LetterStatus;
  isSubmitted: boolean;
  isCurrentRow: boolean;
  isTyped: boolean;
}

export const WordleTile = ({
  letter,
  status,
  isSubmitted,
  isCurrentRow,
  isTyped,
}: WordleTileProps) => {
  const style = isSubmitted
    ? statusStyles[status]
    : isCurrentRow && isTyped
      ? "bg-white border-gray-400 text-gray-900"
      : isCurrentRow
        ? "bg-white border-gray-300 text-gray-900"
        : "bg-white border-gray-200 text-gray-300";

  return (
    <div
      className={cn(
        "w-13 h-13 flex items-center justify-center",
        "text-2xl font-bold border-2 rounded-xl uppercase select-none transition-colors",
        style,
      )}
    >
      {letter}
    </div>
  );
};
