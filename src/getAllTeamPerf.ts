import { prisma } from "./index";

// Gets all of the match numbers of a certain team in a certain tournament
export async function getAllMatches(tournamentName: string) {

    const teamPerfs = await prisma.teamPerfs.findMany({
        where: {
            match: {tournament: {
                title: tournamentName
            } }
        }
    })

   return teamPerfs;
}