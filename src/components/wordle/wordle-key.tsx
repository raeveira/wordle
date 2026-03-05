import { Button } from "@/components/ui/button";
import { cn, statusStyles } from "@/lib/utils";
import type { LetterStatus } from "@/lib/wordle-types";

/**
 * Props for the WordleKey component
 * @typedef {Object} WordleKeyProps
 * @property {string} label - The letter or action text displayed on the key (e.g., "A", "Enter", "Backspace")
 * @property {LetterStatus} [status] - Optional: The validation status of this letter (affects styling)
 * @property {Function} onClick - Callback when the key is clicked, receives the key label
 */
interface WordleKeyProps {
  label: string;
  status?: LetterStatus;
  onClick: (key: string) => void;
}

/**
 * React component that renders a single key from the on-screen Wordle keyboard
 * Displays letter keys, Enter, and Backspace with appropriate sizing and styling
 * Shows letter validation status through background color (green/amber/red for submitted letters)
 * @component
 * @param {WordleKeyProps} props - Component props
 * @param {string} props.label - The key label to display
 * @param {LetterStatus} [props.status] - Optional validation status of this letter
 * @param {Function} props.onClick - Click handler that receives the key label
 * @returns {JSX.Element} Styled button representing a keyboard key
 * @example
 * <WordleKey label="A" status="correct" onClick={handleKey} />
 * <WordleKey label="Enter" onClick={handleKey} />
 */
export const WordleKey = ({ label, status, onClick }: WordleKeyProps) => {
  const isWide = label === "Enter" || label === "Backspace";
  return (
    <Button
      variant={"ghost"}
      onClick={() => onClick(label)}
      className={cn(
        "flex items-center justify-center font-semibold border rounded-lg",
        "text-sm transition-colors cursor-pointer",
        isWide ? "px-2 py-3 min-w-14 text-xs" : "w-8 h-10",
        status
          ? statusStyles[status]
          : "bg-green-100 border-green-200 text-gray-700 hover:bg-green-200",
      )}
    >
      {label}
    </Button>
  );
};
