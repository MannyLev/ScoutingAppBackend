import { prisma } from "./index";
export async function getSchemaMaxima(tournamentName: string) {
    const teamPerformances = await prisma.teamPerformance.findMany({
        where: {
            match: {tournament: {title: tournamentName}}
        }
    })
}