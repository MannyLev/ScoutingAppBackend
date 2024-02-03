import { JsonObject, JsonValue } from "@prisma/client/runtime/library";
import { prisma } from "./index";

export async function putNewTeamPerformance(json: any) {

  var identicalTeamPerf = false;
  var stringifiedCurrentJsonValues = JSON.stringify(json.jsonValues as JsonObject); // is this cool

  
  const parallelTeamPerf = await prisma.teamPerformance.findMany({
    where: {
      match: {tournament: {title: json.tournamentName}, matchNumber: json.matchNumber},
      teamName: json.teamName
    }
  });

  for (let i = 0; i < parallelTeamPerf.length; i++) {
    var isSame = JSON.stringify(parallelTeamPerf[i].jsonScoutInput as JsonObject) === stringifiedCurrentJsonValues;
    if (isSame) {
      identicalTeamPerf = true;
    }
  }
  if (!identicalTeamPerf) {
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
    console.log("2112 by Rush and tournament added ", tournament);

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
    console.log("Touch of Grey by Grateful Dead and matched added ", match); 

    // Creates a new team performance based on the input given in the json file from the scout
    const teamPerf = await prisma.teamPerformance.create({
      data: {
        teamName: json.teamName as string,
        jsonScoutInput: json.jsonValues,
        matchId: match.id
      },
    });
    console.log("Knowledge by Operation Ivy and team performance added ", teamPerf)
  }
}