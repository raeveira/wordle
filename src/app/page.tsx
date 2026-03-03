"use client";
import { CircleQuestionMarkIcon, Settings } from "lucide-react";
import { useState } from "react";
import { InfoScreen } from "@/components/info-screen";
import { Button } from "@/components/ui/button";
import { GameOverScreen } from "@/components/wordle/game-over-screen";
import { WordleGrid } from "@/components/wordle/wordle-grid";
import { WordleKeyboard } from "@/components/wordle/wordle-keyboard";
import { useWordle } from "@/hooks/use-wordle";

const Home = () => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const {
    guesses,
    currentGuess,
    turn,
    letterStatus,
    handleKey,
    gameOver,
    targetWord,
    resetGame,
  } = useWordle(isInfoOpen);

  return (
    <>
      <InfoScreen isOpen={isInfoOpen} setIsOpen={setIsInfoOpen} />
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="w-full max-w-lg flex justify-between">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => setIsInfoOpen(!isInfoOpen)}
          >
            <CircleQuestionMarkIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        <WordleGrid guesses={guesses} currentGuess={currentGuess} turn={turn} />
        <WordleKeyboard letterStatus={letterStatus} onKey={handleKey} />

        {gameOver && (
          <GameOverScreen targetWord={targetWord} resetGame={resetGame} />
        )}
      </div>
    </>
  );
};

export default Home;
