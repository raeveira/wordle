"use server";
import { prisma } from "@/lib/prisma";

export const retrieveWords = async () => {
  return prisma.word.findMany();
};
