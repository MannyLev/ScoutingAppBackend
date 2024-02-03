import { prisma } from "./index";

export async function getMatchNumbers(tournamentName: string) {
    const matches = await prisma.match.findMany({
        where: {
            tournament: {title: tournamentName}
        }
    })

    let returnSet: Set<number> = new Set(); 

    for (let i = 0; i < matches.length; i++) {
        if ((matches[i] != null) && (matches[i] != undefined)) {
            returnSet.add(matches[i].matchNumber);
        }
    }
    const returnArray = Array.from(returnSet);
    return returnArray;
}