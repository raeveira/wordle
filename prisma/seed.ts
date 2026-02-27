import { socialIssuesData } from "@/data/social-issues";
import { prisma } from "@/lib/prisma";

const main = async () => {
  await prisma.word
    .createMany({
      data: socialIssuesData,
    })
    .then(() => {
      console.log("Seeding finished");
    })
    .catch((e) => {
      console.error("Seeding error: ", e);
    });
};

void main();
