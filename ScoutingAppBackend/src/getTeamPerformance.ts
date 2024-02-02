import { prisma } from "./index";

export async function getTeamPerformance(tournamentName: string, matchNumber: number, teamNumber: number) {
    const posts = await prisma.teamPerformance.findMany({
        where: {
           teamNumber: teamNumber,
           match: { tournament: {title: tournamentName}, matchNumber: matchNumber}
        },
      })
      return posts;
}

