import { Card, CardContent } from "@/components/ui/card";
import { WordleRow } from "@/components/wordle/wordle-row";
import type { Tile } from "@/lib/wordle-types";

/**
 * Props for the WordleGrid component
 * @typedef {Object} WordleGridProps
 * @property {Tile[][]} guesses - 6x5 grid of submitted guesses with tile statuses
 * @property {string} currentGuess - Current guess being typed (0-5 characters)
 * @property {number} turn - Current turn number (0-5)
 */
interface WordleGridProps {
  guesses: Tile[][];
  currentGuess: string;
  turn: number;
}

/**
 * React component that renders the 6x5 Wordle game grid
 * Displays all previous guesses and the current guess row being typed
 * @component
 * @param {WordleGridProps} props - Component props
 * @param {Tile[][]} props.guesses - All submitted guesses
 * @param {string} props.currentGuess - Word currently being typed
 * @param {number} props.turn - Current turn index (0-5)
 * @returns {JSX.Element} Rendered game grid with all rows
 * @example
 * <WordleGrid guesses={guesses} currentGuess="STEAL" turn={2} />
 */
export const WordleGrid = ({
  guesses,
  currentGuess,
  turn,
}: WordleGridProps) => (
  <Card className="bg-green-50 border-green-100 w-full max-w-lg shadow-sm">
    <CardContent className="p-5 flex flex-col items-center gap-2">
      {guesses.map((row, rowIndex) => (
        <WordleRow
          key={`${rowIndex}-${row}`}
          tiles={row}
          isSubmitted={rowIndex < turn}
          isCurrentRow={rowIndex === turn}
          currentGuess={currentGuess}
        />
      ))}
    </CardContent>
  </Card>
);
