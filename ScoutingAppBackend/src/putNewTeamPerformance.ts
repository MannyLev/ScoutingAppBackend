import { JsonObject, JsonValue } from "@prisma/client/runtime/library";
import { prisma } from "./index";

export async function putNewTeamPerformance(json: JsonObject) {

    // Creates a tournament if it does not exist with the given tournament name
    const tournament = await prisma.tournament.upsert({
        where: {
            title : json.tournamentName as string,
        },
        update: {},
        create: {
            matches: {},
            title: json.tournamentName as string,
        }
    })
    console.log("tournament " + tournament);

    // Sees if match exists and creates one if it doesn't with given match number
  const match = await prisma.match.upsert({
    where: {
        uniqueMatchId : {
            matchNumber: json.matchNumber as number,
            tournamentId: tournament.id
        }
    },
    update: {},
    create: {
        matchNumber: json.matchNumber as number,
        teams: {},
        tournamentId: tournament.id
    }
  }); 
  console.log("matches " + match); 

  // Creates a new team performance based on the input given in the json file from the scout
  const teamPerf = await prisma.teamPerformance.create({
    data: {
      teamNumber: json.teamNumber as number,
      jsonScoutInput: json,
      matchId: match.id
    },
  });
}