"use server";
import { prisma } from "@/lib/prisma";

/**
 * Server action to fetch all available words from the database
 * This function runs on the server and retrieves the complete word list for the game
 * Use this in server components or in client actions that need the word database
 * @async
 * @function retrieveWords
 * @returns {Promise<Word[]>} Array of all Word objects with word and description properties
 * @throws {Error} If database connection fails or query encounters an error
 * @example
 * const words = await retrieveWords();
 * const randomWord = words[Math.floor(Math.random() * words.length)];
 */
export const retrieveWords = async () => {
  return prisma.word.findMany();
};
