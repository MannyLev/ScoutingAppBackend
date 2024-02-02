import { prisma } from "./index";

// Gets all the matches for a given team in a given tournament

export async function getTeamMatches(tournamentName: string, teamNumber: number) {
    const posts = await prisma.teamPerformance.findMany({
        where: {
          teamNumber: teamNumber,
          match: {tournament: {title: tournamentName}}
        }
      })
      return posts;
}