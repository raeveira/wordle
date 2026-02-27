"use client";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameOverScreen } from "@/components/wordle/game-over-screen";
import { WordleGrid } from "@/components/wordle/wordle-grid";
import { WordleKeyboard } from "@/components/wordle/wordle-keyboard";
import { useWordle } from "@/hooks/use-wordle";

const Home = () => {
  const {
    guesses,
    currentGuess,
    turn,
    letterStatus,
    handleKey,
    gameOver,
    targetWord,
    resetGame,
  } = useWordle();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="w-full max-w-lg flex justify-end">
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
  );
};

export default Home;
