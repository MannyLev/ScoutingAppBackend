import { prisma } from "./index";

// Gets all of the team names in the tournament
export async function getTeamNames(tournamentName: string) {

    // Gets all of the team performances in a given tournament
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
           match: { tournament: {title: tournamentName}}
        },
      })

      let returnSet: Set<number> = new Set(); 

      // Iterates through the found team performances and adds a team number if it has not been included already
      for(let i = 0; i < teamPerformances.length; i++) {
        var currentNumber = teamPerformances[i].teamNumber as number;

        if (currentNumber != null) {
            returnSet.add(currentNumber);
        }

    }
    const returnArray = Array.from(returnSet);
    return returnArray;
}