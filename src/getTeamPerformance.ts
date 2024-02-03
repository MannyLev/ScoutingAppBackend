import { prisma } from "./index";

export async function getTeamPerformance(tournamentName: string, matchNumber: number, teamName: string) {
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
           teamName: teamName,
           match: { tournament: {title: tournamentName}, matchNumber: matchNumber}
        },
      })
      return teamPerformances;
}

