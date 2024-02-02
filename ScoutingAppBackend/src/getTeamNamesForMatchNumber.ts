import { prisma } from "./index";

// Gets all of the team names for a certain match number
export async function getTeamNamesForMatchNumber(tournamentName: string, matchNumber: number) {
    
    // Finds all of the team performances in the tournament for a specific match
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
           match: { tournament: {title: tournamentName}, matchNumber: matchNumber},
        }
      })

    let returnArray: Array<number> = [];

    // Finds all of the team names for the given group of team performances
    for(let i = 0; i < teamPerformances.length; i++) {
        
        var teamNumber = teamPerformances[i].teamNumber as number;

        // If not null, adds that match number to the array
        if (teamNumber != null) {
            returnArray.push(matchNumber);
        }
    }
    return returnArray;
}