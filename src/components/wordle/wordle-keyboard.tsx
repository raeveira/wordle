import { Card, CardContent } from "@/components/ui/card";
import { KEYBOARD_ROWS } from "@/components/wordle/constants";
import { WordleKey } from "@/components/wordle/wordle-key";
import type { LetterStatus } from "@/lib/wordle-types";

/**
 * Props for the WordleKeyboard component
 * @typedef {Object} WordleKeyboardProps
 * @property {Record<string, LetterStatus>} letterStatus - Map of each letter to its validation status
 * @property {Function} onKey - Callback when any key is pressed, receives the key label
 */
interface WordleKeyboardProps {
  letterStatus: Record<string, LetterStatus>;
  onKey: (key: string) => void;
}

/**
 * React component that renders the complete QWERTY on-screen keyboard for Wordle
 * Displays all letter keys plus Enter and Backspace in three rows
 * Each key shows the letter's current validation status through color coding
 * @component
 * @param {WordleKeyboardProps} props - Component props
 * @param {Record<string, LetterStatus>} props.letterStatus - Status map for styling each key
 * @param {Function} props.onKey - Callback receiving the pressed key label
 * @returns {JSX.Element} Complete QWERTY keyboard layout
 * @example
 * <WordleKeyboard letterStatus={letterStatus} onKey={handleKey} />
 */
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
