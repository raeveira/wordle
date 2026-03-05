import { WordleTile } from "@/components/wordle/wordle-tile";
import type { Tile } from "@/lib/wordle-types";

/**
 * Props for the WordleRow component
 * @typedef {Object} WordleRowProps
 * @property {Tile[]} tiles - Array of 5 tiles with letter and status data
 * @property {boolean} isSubmitted - Whether this row has been submitted and is finalized
 * @property {boolean} isCurrentRow - Whether this is the active row being edited
 * @property {string} currentGuess - Current text in the active row (only relevant if isCurrentRow is true)
 */
interface WordleRowProps {
  tiles: Tile[];
  isSubmitted: boolean;
  isCurrentRow: boolean;
  currentGuess: string;
}

/**
 * React component that renders a single row of the Wordle grid (5 tiles)
 * Displays either a submitted row with validation results, or the active typing row
 * @component
 * @param {WordleRowProps} props - Component props
 * @param {Tile[]} props.tiles - Tile data for this row
 * @param {boolean} props.isSubmitted - If true, displays final validated tiles
 * @param {boolean} props.isCurrentRow - If true, displays tiles being typed
 * @param {string} props.currentGuess - Text currently typed in this row
 * @returns {JSX.Element} Rendered row with 5 tiles
 * @example
 * <WordleRow tiles={guesses[0]} isSubmitted={true} isCurrentRow={false} currentGuess="" />
 */
export const WordleRow = ({
  tiles,
  isSubmitted,
  isCurrentRow,
  currentGuess,
}: WordleRowProps) => (
  <div className="flex gap-2">
    {tiles.map((tile, colIndex) => {
      const letter = isSubmitted
        ? tile.letter
        : isCurrentRow
          ? (currentGuess[colIndex] ?? "")
          : "";
      return (
        <WordleTile
          key={`${colIndex}-${tile}`}
          letter={letter}
          status={tile.status}
          isSubmitted={isSubmitted}
          isCurrentRow={isCurrentRow}
          isTyped={isCurrentRow && colIndex < currentGuess.length}
        />
      );
    })}
  </div>
);
