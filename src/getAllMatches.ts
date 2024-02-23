import { prisma } from "./index";

// Gets all of the match numbers of a certain team in a certain tournament
export async function getAllMatches(tournamentName: string) {

    const matches = await prisma.match.findMany({
        where: {
            tournament: {
                title: tournamentName
            }
        }
    })

   return matches;
}