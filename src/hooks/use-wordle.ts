import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { retrieveRandomWord } from "@/lib/retrieve-words";
import type { LetterStatus, Tile, Word } from "@/lib/wordle-types";

/**
 * Custom React hook that manages all Wordle game logic and state
 * Handles word validation, guess checking, game progression, and keyboard input
 * @function useWordle
 * @param {boolean} isInfoOpen - Whether the info modal/overlay is currently open (blocks game input)
 * @returns {Object} Game state and control functions
 * @returns {Tile[][]} return.guesses - 6x5 grid of all submitted guesses and their tile statuses
 * @returns {string} return.currentGuess - The current word being typed (0-5 characters)
 * @returns {number} return.turn - Current round number (0-5), increments after each valid submission
 * @returns {Record<string, LetterStatus>} return.letterStatus - Keyboard state mapping each letter to its status
 * @returns {boolean} return.gameOver - Whether the game has ended (win or lose)
 * @returns {Function} return.handleKey - Processes keyboard input (letters, Enter, Backspace)
 * @returns {Word|null} return.targetWord - The current target word object or null if loading
 * @returns {Function} return.resetGame - Resets all game state to initial values
 * @example
 * const { guesses, currentGuess, handleKey, targetWord, gameOver } = useWordle(isInfoOpen);
 */
export const useWordle = (isInfoOpen: boolean) => {
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
  const [isValidating, setIsValidating] = useState<boolean>(false);

  /**
   * Utility function to create a promise-based delay
   * @function sleep
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise<void>} Resolves after the specified delay
   * @example
   * await sleep(1000); // Wait 1 second
   */
  const sleep = useCallback(
    (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
    [],
  );

  /**
   * Validates if a word exists using the Dictionary API
   * Implements caching and retry logic with exponential backoff for rate limits
   * Displays toast notifications for user feedback
   * @async
   * @function validateWord
   * @param {string} word - The word to validate (uppercase or lowercase)
   * @returns {Promise<boolean>} True if word is valid, false otherwise
   * @throws {Error} If no word is provided
   * @private
   */
  const validateWord = useCallback(
    async (word: string): Promise<boolean> => {
      if (!word) throw new Error("No word was given.");

      // 1. Return early if the word is in the local cache
      if (checkedWordsCache.current.has(word)) {
        const isValid = checkedWordsCache.current.get(word);
        if (!isValid) toast.error("Word does not exist");
        return isValid || true;
      }

      toast.info("Validating word");
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

      let retries = 3;

      while (retries > 0) {
        try {
          const response = await fetch(url, { method: "HEAD" });

          switch (response.status) {
            case 200:
            case 304:
              toast.success(`"${word.toLowerCase()}" is a valid word.`);
              return true;

            // 404 Not Found: The word does not exist
            case 404:
              toast.error(`"${word.toLowerCase()}" is not a recognized word.`);
              return false;

            // 429 Too Many Requests: Rate limit exceeded (450 req / 5 min)
            case 429:
              retries -= 1;
              if (retries === 0) {
                toast.error("Rate limit exceeded. Please try again later.");
                return false;
              }

              toast.warning(
                `Rate limit hit. Waiting 5 seconds... (${retries} retries left)`,
              );
              // 3. Pause the actual execution block here, then let the while loop repeat
              await sleep(5000);
              continue;

            // Handle any other unexpected status codes (e.g., 500 Server Error)
            default:
              console.error(`Unexpected API response: ${response.status}`);
              toast.error("Unexpected Error, please try again later.");
              return false;
          }
        } catch (err) {
          toast.error("Network error occurred");
          console.error("Network error during validation:", err);
          return false;
        }
      }
      return false;
    },
    [sleep],
  );

  /**
   * Compares a guessed word against the target word and returns tile statuses
   * Implements Wordle matching logic: correct letters get marked green, misplaced get yellow, etc.
   * Handles duplicate letters correctly (doesn't over-mark duplicates)
   * @function checkGuess
   * @param {string} guess - The guessed word (5 letters, uppercase)
   * @param {string} target - The target word to compare against (5 letters, uppercase)
   * @returns {Tile[]} Array of 5 tiles with letters and their validation statuses
   * @throws {Error} If targetWord is not initialized
   * @private
   * @example
   * const result = checkGuess("STEAL", "LEAST");
   * // Returns tiles showing S/E/A/L are misplaced, T is correct
   */
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

  /**
   * Handles guess submission: validates, checks against target, updates game state
   * Validates word exists, updates tile/keyboard statuses, advances turn, checks win condition
   * @async
   * @function onSubmit
   * @returns {Promise<void>}
   * @private
   */
  const onSubmit = useCallback(async () => {
    if (currentGuess.length !== 5 || turn >= 6 || gameOver) return;

    setIsValidating(true);

    const currentGuessUpper = currentGuess.toUpperCase();
    const targetUpper = targetWord?.word.toUpperCase();

    const wordExists = await validateWord(currentGuessUpper);

    if (!wordExists) {
      setIsValidating(false);
      return;
    }

    const result = checkGuess(currentGuessUpper, targetUpper || "");

    setGuesses((prev) => prev.map((row, i) => (i === turn ? result : row)));
    // Update keyboard status
    setLetterStatus((prev) => {
      const next = { ...prev };
      result.forEach(({ letter, status }) => {
        const currentStatus = next[letter];
        // If already green never downgrade
        if (currentStatus === "correct") {
          return;
        }
        // If it's already yellow only upgrade to green, never downgrade
        if (currentStatus === "misplaced" && status === "incorrect") {
          return;
        }
        // otherwise set the new status
        next[letter] = status;
      });
      setIsValidating(false);
      return next;
    });

    setTurn((t) => t + 1);
    setCurrentGuess("");

    if (currentGuessUpper === targetUpper || turn + 1 >= 6) {
      setGameOver(true);
    }
  }, [checkGuess, currentGuess, gameOver, targetWord, turn, validateWord]);

  /**
   * Processes keyboard input (letters, Enter, Backspace)
   * Respects game state (ignores input if game over, modal open, or validating)
   * Handles Enter to submit, Backspace to delete, or letter keys to append
   * @function handleKey
   * @param {string} key - The keyboard key pressed (e.g., "A", "Enter", "Backspace")
   * @returns {void}
   * @private
   */
  const handleKey = useCallback(
    (key: string) => {
      if (isInfoOpen) return;
      if (isValidating) return;
      if (gameOver) return;
      if (key === "Enter") {
        if (currentGuess.length === 5) onSubmit();
      } else if (key === "Backspace") setCurrentGuess((p) => p.slice(0, -1));
      else if (/^[A-Z]$/.test(key) && currentGuess.length < 5)
        setCurrentGuess((p) => p + key);
    },
    [currentGuess.length, gameOver, isInfoOpen, onSubmit, isValidating],
  );

  /**
   * Completely resets the game to its initial state
   * Clears target word, guesses, current input, turn counter, and letter statuses
   * Used when starting a new game or resetting after game over
   * @function resetGame
   * @returns {void}
   */
  const resetGame = useCallback(() => {
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
      const newWord = await retrieveRandomWord();
      if (newWord) setTargetWord(newWord);
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
