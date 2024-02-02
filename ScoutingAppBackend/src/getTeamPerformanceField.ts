import { JsonObject } from "@prisma/client/runtime/library";
import { getFieldArray } from "./getFieldArray";
import { prisma } from "./index";

export async function getTeamPerformanceField(field: string, tournamentName: string, matchNumber: number, teamNumber: number) {
    const posts = await prisma.teamPerformance.findMany({
        where: {
           teamNumber: teamNumber,
           match: { tournament: {title: tournamentName}, matchNumber: matchNumber}
        },
      })

      console.log("Hunting High and Low by Stratovarius and posts found ", posts);
      return getFieldArray(posts.map(e => e.jsonScoutInput as JsonObject), field);
}