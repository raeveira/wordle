import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { retrieveWords } from "@/lib/retrieve-words";
import type { LetterStatus, Tile, Word } from "@/lib/wordle-types";

export const useWordle = () => {
  const [targetWord, setTargetWord] = useState<Word | null>(null);
  const [guesses, setGuesses] = useState<Tile[][]>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: "",
        status: "incorrect" as LetterStatus,
      })),
    ),
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [turn, setTurn] = useState(0);
  const [letterStatus, setLetterStatus] = useState<
    Record<string, LetterStatus>
  >({});
  const [gameOver, setGameOver] = useState(false);
  const checkedWordsCache = useRef<Map<string, boolean>>(new Map());

  const checkWordExistence = useCallback(async (word: string) => {
    if (!word) throw new Error("No word was given.");

    // 1. Return early if the word is in the local cache
    if (checkedWordsCache.current.has(word)) {
      const isValid = checkedWordsCache.current.get(word);
      if (!isValid) toast.error("Word does not exist");
      return { success: isValid };
    }

    toast.info("Validating word");
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
      const response = await fetch(url, { method: "GET" });

      // 2. Explicitly handle the rate limit status code
      if (response.status === 429) {
        toast.error("Rate limit exceeded. Please wait a moment.");
        return { success: false, rateLimited: true };
      }

      if (response.status !== 200) {
        toast.error("Word does not exist");
        checkedWordsCache.current.set(word, false);
        return { success: false };
      }

      checkedWordsCache.current.set(word, true);
      return { success: true };
    } catch (err) {
      toast.error("Network error occurred");
      console.error(err);
      return { success: false };
    }
  }, []);

  // Check the user guess
  const checkGuess = useCallback(
    (guess: string, target: string): Tile[] => {
      if (!targetWord) {
        throw new Error("No target word was selected");
      }

      const guessArray = guess.split("");
      const result: Tile[] = [];

      // Color correct guesses green
      guessArray.forEach((letter, i) => {
        if (letter === target[i]) {
          result[i] = { letter: guess[i], status: "correct" };
        }
      });

      // Color misplaced guesses yellow (amber)
      const remainingTarget = target
        .split("")
        .filter((_, i) => result[i]?.status !== "correct");

      guessArray.forEach((letter, i) => {
        if (!result[i]) {
          if (remainingTarget.includes(letter)) {
            result[i] = { letter: guess[i], status: "misplaced" };
            const index = remainingTarget.indexOf(letter);
            remainingTarget.splice(index, 1);
          } else {
            result[i] = { letter: guess[i], status: "incorrect" };
          }
        }
      });

      return result;
    },
    [targetWord],
  );

  // On user submit go through game logic
  const onSubmit = useCallback(async () => {
    if (currentGuess.length !== 5 || turn >= 6 || gameOver) return;

    const currentGuessUpper = currentGuess.toUpperCase();
    const targetUpper = targetWord?.word.toUpperCase();

    const wordExists = await checkWordExistence(currentGuessUpper);

    if (!wordExists.success) return;

    const result = checkGuess(currentGuessUpper, targetUpper || "");

    setGuesses((prev) => prev.map((row, i) => (i === turn ? result : row)));

    // Update keyboard status
    setLetterStatus((prev) => {
      const next = { ...prev };
      result.forEach(({ letter, status }) => {
        next[letter] = status === "correct" ? "correct" : status;
      });
      return next;
    });

    setTurn((t) => t + 1);
    setCurrentGuess("");

    if (currentGuessUpper === targetUpper || turn + 1 >= 6) {
      setGameOver(true);
    }
  }, [
    checkGuess,
    currentGuess,
    gameOver,
    targetWord,
    turn,
    checkWordExistence,
  ]);

  const handleKey = useCallback(
    (key: string) => {
      if (gameOver) return;
      if (key === "Enter") {
        if (currentGuess.length === 5) onSubmit();
      } else if (key === "Backspace") setCurrentGuess((p) => p.slice(0, -1));
      else if (/^[A-Z]$/.test(key) && currentGuess.length < 5)
        setCurrentGuess((p) => p + key);
    },
    [currentGuess.length, gameOver, onSubmit],
  );

  const resetGame = useCallback(() => {
    // Volledige reset van alle game state
    setTargetWord(null);
    setGameOver(false);
    setCurrentGuess("");
    setTurn(0);
    setLetterStatus({});

    // Reset guesses naar lege tiles
    setGuesses(
      Array.from({ length: 6 }, () =>
        Array.from({ length: 5 }, () => ({
          letter: "",
          status: "incorrect" as LetterStatus,
        })),
      ),
    );
  }, []);

  // New targetword selection
  useEffect(() => {
    if (targetWord) return;

    const setNewTargetWord = async () => {
      const words = await retrieveWords();

      const newWord = words[Math.floor(Math.random() * words.length)];
      setTargetWord(newWord);
    };

    void setNewTargetWord();
  }, [targetWord]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      handleKey(
        e.key === "Backspace" || e.key === "Enter"
          ? e.key
          : e.key.toUpperCase(),
      );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  return {
    guesses,
    currentGuess,
    turn,
    letterStatus,
    gameOver,
    handleKey,
    targetWord,
    resetGame,
  };
};
