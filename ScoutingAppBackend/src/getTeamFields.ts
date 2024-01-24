import { JsonObject } from "@prisma/client/runtime/library";
import { getFieldArray } from "./getFieldArray";
import { prisma } from "./index";

// Given a field, it returns an array of the values for that field
export async function getTeamFields(field: string, tournamentName: string, teamNumber: number) {
  const posts = await prisma.teamPerformance.findMany({
    where: {
      teamNumber: teamNumber,
      match: {tournament: {title: tournamentName}}
    }
  })
  console.log("Fall Into Oblivion by Silent Force ", posts);
  return getFieldArray(posts.map(e => e.jsonScoutInput as JsonObject), field);
}