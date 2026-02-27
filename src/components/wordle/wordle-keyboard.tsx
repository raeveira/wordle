import { Card, CardContent } from "@/components/ui/card";
import { KEYBOARD_ROWS } from "@/components/wordle/constants";
import { WordleKey } from "@/components/wordle/wordle-key";
import type { LetterStatus } from "@/lib/wordle-types";

interface WordleKeyboardProps {
  letterStatus: Record<string, LetterStatus>;
  onKey: (key: string) => void;
}

export const WordleKeyboard = ({
  letterStatus,
  onKey,
}: WordleKeyboardProps) => (
  <div className="w-full max-w-lg flex flex-col items-center gap-2">
    <span className="text-sm text-muted-foreground">Normal Mode</span>
    <Card className="bg-green-50 border-green-100 w-full shadow-sm">
      <CardContent className="p-3 flex flex-col gap-1.5">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={`${rowIndex}-${row}`} className="flex justify-center gap-1">
            {row.map((key) => (
              <WordleKey
                key={key}
                label={key}
                status={letterStatus[key]}
                onClick={onKey}
              />
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);
