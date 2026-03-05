import { cn, statusStyles } from "@/lib/utils";
import type { LetterStatus } from "@/lib/wordle-types";

/**
 * Props for the WordleTile component
 * @typedef {Object} WordleTileProps
 * @property {string} letter - The letter character to display in the tile
 * @property {LetterStatus} status - The validation status (correct, misplaced, incorrect)
 * @property {boolean} isSubmitted - Whether this tile is part of a submitted row
 * @property {boolean} isCurrentRow - Whether this tile is in the active typing row
 * @property {boolean} isTyped - Whether the user has typed this position in the current row
 */
interface WordleTileProps {
  letter: string;
  status: LetterStatus;
  isSubmitted: boolean;
  isCurrentRow: boolean;
  isTyped: boolean;
}

/**
 * React component that renders a single Wordle game tile/cell
 * Displays a letter with appropriate styling based on game state and validation status
 * Changes appearance based on whether it's submitted, being typed, or empty
 * @component
 * @param {WordleTileProps} props - Component props
 * @param {string} props.letter - Letter to display (empty string for empty tiles)
 * @param {LetterStatus} props.status - Validation status determining background color
 * @param {boolean} props.isSubmitted - If true, applies status colors (green/amber/red)
 * @param {boolean} props.isCurrentRow - If true, this tile is being typed in
 * @param {boolean} props.isTyped - If true and isCurrentRow, shows filled border
 * @returns {JSX.Element} Styled tile div with letter content
 * @example
 * <WordleTile letter="S" status="correct" isSubmitted={true} isCurrentRow={false} isTyped={false} />
 */
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
