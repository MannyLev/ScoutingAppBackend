import { prisma } from "./index";
import { JsonObject } from "@prisma/client/runtime/library";
import { getFieldArray } from "./getFieldArray";

export async function getMatchFields(field: string, tournamentName: string, matchNumber: number) {
    const posts = await prisma.teamPerformance.findMany({
        where: {
          match: {tournament: {title: tournamentName}, matchNumber: matchNumber}
        }
      })
      console.log("Flight of Icarus by Iron Maiden and fields found ", getFieldArray(posts.map(e => e.jsonScoutInput as JsonObject), field).toString());
      return getFieldArray(posts.map(e => e.jsonScoutInput as JsonObject), field);
}