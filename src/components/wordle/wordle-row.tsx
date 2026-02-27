import { WordleTile } from "@/components/wordle/wordle-tile";
import type { Tile } from "@/lib/wordle-types";

interface WordleRowProps {
  tiles: Tile[];
  isSubmitted: boolean;
  isCurrentRow: boolean;
  currentGuess: string;
}

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
