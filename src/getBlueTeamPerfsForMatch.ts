import { prisma } from "./index";

// Gets all the team performances for a specific match
export async function getBlueTeamPerfsForMatch(tournamentName: string, matchNumber: number) {
  const teamPerformances = await prisma.teamPerformance.findMany({
    where: {
      match: { tournament: { title: tournamentName }, matchNumber: matchNumber },
    }
  })
  // Should we make it of length 3? and set the m intially to null
  // Have a zod error if one of member of the alliance isn't there, and for OPR calculations just don't include that match
  let blueAlliance: Array<teamPerformance> = [];
  for (let i = 0; i < teamPerformances.length; i++) {
    if (teamPerformances[i].jsonValue.allianceColor == "Blue") { // require alliance color
      blueAlliance.push(teamPerformances[i]);
    }
  }
  return blueAlliance;
}