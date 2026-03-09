"use server";
import { prisma } from "@/lib/prisma";

/**
 * Server action that retrieves a single random word from the database.
 *
 * This function is intended for starting a new game, where only one target word
 * is needed instead of loading the full word list. It first counts the available
 * words, then selects one random row using a calculated offset.
 *
 * @async
 * @function retrieveRandomWord
 * @returns {Promise<{id: number, word: string, description: string} | null>}
 * A promise that resolves to one random word object, or `null` when no words exist.
 * @throws {Error} If the database query fails.
 *
 * @example
 * const word = await retrieveRandomWord();
 *
 * if (word) {
 *   setTargetWord(word);
 * }
 */
export const retrieveRandomWord = async () => {
  const count = await prisma.word.count();

  if (count === 0) return null;

  const skip = Math.floor(Math.random() * count);

  const [word] = await prisma.word.findMany({
    select: {
      id: true,
      description: true,
      word: true,
    },
    skip,
    take: 1,
  });

  return word ?? null;
};
