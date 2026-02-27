import { Card, CardContent } from "@/components/ui/card";
import { WordleRow } from "@/components/wordle/wordle-row";
import type { Tile } from "@/lib/wordle-types";

interface WordleGridProps {
  guesses: Tile[][];
  currentGuess: string;
  turn: number;
}

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
