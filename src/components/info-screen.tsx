"use client";
import { CircleXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ColourDescription } from "@/components/colour-description";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export const InfoScreen = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const infoInitiallyClosed = localStorage.getItem("infoInitiallyClosed");

    if (infoInitiallyClosed !== "true") {
      setIsOpen(true);
    }
  }, []);

  const onClose = () => {
    localStorage.setItem("infoInitiallyClosed", "true");
    setIsOpen(false);
  };

  if (!isMounted) return null;

  if (isOpen) {
    return (
      <>
        <div className="absolute w-full h-full z-20 bg-black/50" />
        <div className="fixed w-screen h-screen z-20 flex items-center justify-center -top-20">
          <Card className="pl-2 max-w-1/2 relative">
            <CardTitle className="absolute left-1/2 -translate-x-1/2 -top-12.5 text-2xl text-white">
              How to play
            </CardTitle>
            <CardContent>
              {/* Info title */}
              <h3 className="bold text-xl mb-4">Guess the WORD in 6 tries.</h3>
              {/* Rule list */}
              <li className="ml-4">
                Each guess must be a valid english 5-letter word.
              </li>
              <li className="ml-4">
                The color of the tiles will change to show how close your guess
                was to the word.
              </li>
              {/* Colour descriptions */}
              <div className="mt-5">
                <ColourDescription
                  colour="7bf1a8"
                  text="If the square is green behind the letter, 
the letter is correctly guessed."
                />
                <ColourDescription
                  colour="FFC486"
                  text="If the square is orange behind the letter, 
the letter is misplaced."
                />
                <ColourDescription
                  colour="ffa2a2"
                  text="If the square is red behind the letter, 
the letter is wrongly guessed."
                />
                <ColourDescription
                  colour="dcfce7"
                  text="If the square is light green behind the letter, 
the letter is not yet guessed."
                />
              </div>
              {/* Close button */}
              <Button
                variant={"ghost"}
                size={"icon-lg"}
                onClick={onClose}
                className="absolute z-21 top-0 p-0 right-0 hover:bg-transparent group"
              >
                <CircleXIcon
                  size={20}
                  className="w-5! h-5! group-hover:text-red-400"
                />
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  } else {
    return;
  }
};
