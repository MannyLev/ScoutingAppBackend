import { prisma } from "./index";

// Gets all of the match numbers of a certain team in a certain tournament
export async function getMatchNumbersForTeam(tournamentName: string, teamNumber: number) {
    
    // Finds all of the team performances in the tournament for a specific team
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
           match: { tournament: {title: tournamentName}},
           teamNumber: teamNumber
        },
        include: {
            match: true
        }
      })

    let returnArray: Array<number> = [];

    // Finds the match number for the specific team performance
    
    for(let i = 0; i < teamPerformances.length; i++) {

        var matchNumber = teamPerformances[i].match?.matchNumber as number;

        // If not null, adds that match number to the array
        if (matchNumber != null) {
            returnArray.push(matchNumber);
        }
    }
    return returnArray;
}