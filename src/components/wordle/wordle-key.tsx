import { Button } from "@/components/ui/button";
import { cn, statusStyles } from "@/lib/utils";
import type { LetterStatus } from "@/lib/wordle-types";

interface WordleKeyProps {
  label: string;
  status?: LetterStatus;
  onClick: (key: string) => void;
}

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
