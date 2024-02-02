import { prisma } from "./index";

// Gets all the team performances for a specific match
export async function getMatch(tournamentName: string, matchNumber: number) {
    const posts = await prisma.teamPerformance.findMany({
    where: {
      match: {tournament: {title: tournamentName}, matchNumber: matchNumber}
    }
  })
  return posts;
}