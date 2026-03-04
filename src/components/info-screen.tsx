"use client";
import { CircleXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import { ColourDescription } from "@/components/colour-description";
import { Button } from "@/components/ui/button";

export const InfoScreen = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const infoInitiallyClosed = localStorage.getItem("infoInitiallyClosed");

    if (infoInitiallyClosed !== "true") {
      setIsOpen(true);
    }
  }, [setIsOpen]);

  const handleOpenChange = (open: boolean) => {
    // If the dialog is closing, save it to local storage
    if (!open) {
      localStorage.setItem("infoInitiallyClosed", "true");
    }
    setIsOpen(open);
  };

  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-2">
            How to play
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant={"ghost"}
              size={"icon-lg"}
              className="absolute top-4 right-4 p-0 hover:bg-transparent group"
            >
              <CircleXIcon
                size={20}
                className="w-5! h-5! group-hover:text-red-400"
              />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl">Guess the WORD in 6 tries.</h3>

          <ul className="list-disc ml-4 space-y-2">
            <li>Each guess must be a valid english 5-letter word.</li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>

          {/* Colour descriptions */}
          <div className="mt-5 flex flex-col gap-3">
            <ColourDescription
              colour="7bf1a8"
              text="If the square is green behind the letter, the letter is correctly guessed."
            />
            <ColourDescription
              colour="FFC486"
              text="If the square is orange behind the letter, the letter is misplaced."
            />
            <ColourDescription
              colour="ffa2a2"
              text="If the square is red behind the letter, the letter is wrongly guessed."
            />
            <ColourDescription
              colour="dcfce7"
              text="If the square is light green behind the letter, the letter is not yet guessed."
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
