import express from "express"
import bodyParser from "body-parser";
import { prisma } from "./index";
import { getFieldArray } from "./getFieldArray";
import { getMatchFields } from "./getMatchFields";
import { getTeamFields } from "./getTeamFields";
import { getTeamPerformanceField } from "./getTeamPerformanceField";
import { putNewTeamPerformance } from "./putNewTeamPerformance";
import { JsonObject, JsonValue } from "@prisma/client/runtime/library";

const app = express();
app.use(bodyParser.json());

// Adds a team performance to the database
app.post("/addTeamMatch", async (req, res) => {
  const json = req.body;

  // TODO: Require that a schema must be written with a teamNumber, tournamentName, and a matchNumber in specified way

  // Creates a tournament if it does not exist with the given tournament name
  const tournament = await prisma.tournament.upsert({
    where: {
        title : json.tournamentName,
    },
    update: {},
    create: {
        matches: {},
        title: json.tournamentName,
    }
  });
  console.log("tournament " + tournament);

  // Sees if match exists and creates one if it doesn't with given match number
  const match = await prisma.match.upsert({
    where: {
        uniqueMatchId : {
            matchNumber: json.matchNumber,
            tournamentId: tournament.id
        }
    },
    update: {},
    create: {
        matchNumber: json.matchNumber,
        teams: {},
        tournamentId: tournament.id
    }
  }); 
  console.log("matches " + match); 

  // Creates a new team performance based on the input given in the json file from the scout
  // TODO: The json file will be converted from the qr code and fed to this as input
  const teamPerf = await prisma.teamPerformance.create({
    data: {
      teamNumber: json.teamNumber,
      jsonScoutInput: json.jsonValues,
      matchId: match.id
    },
  });
  return res.json(teamPerf); 
}),

// Gets a specific team performance for a given tournament, match number, and team number
app.get("/getSpecificTeamPerformance", async (req, res) => {
  const json = req.body;
  // console.log(json);
  const posts = await prisma.teamPerformance.findMany({
    where: {
       teamNumber: json.teamNumber,
       match: { tournament: {title: json.tournamentName}, matchNumber: json.MatchNumber}
    },
  })
  console.log("Yo ", posts);
  return res.json(posts);
}),

// Gets all the matches for a given team in a given tournament
app.get("/getTeamMatches", async (req, res) => {
  const json = req.body;
  const posts = await prisma.teamPerformance.findMany({
    where: {
      teamNumber: json.teamNumber,
      match: {tournament: {title: json.tournamentName}}
    }
  })
  console.log("Ha ", posts);
  return res.json(posts);
}),

// Gets all the team performances for a specific match
app.get("/getSpecificMatch", async (req, res) => {
  const json = req.body;
  const posts = await prisma.teamPerformance.findMany({
    where: {
      match: {tournament: {title: json.tournamentName}, matchNumber: json.matchNumber}
    }
  })
  console.log("Wow ", posts);
  return res.json(posts);
})

// Gets all of the values under the "field" key for a specific team
app.get("/getTeamFields", async (req, res) => {
  const json = req.body;
  return getTeamFields(json.field, json.tournamentName, json.teamNumber);
})

// Gets all of the values under the "field" key for a specific match
app.get("/getMatchFields", async (req, res) => {
  const json = req.body;
  return getTeamFields(json.field, json.tournamentName, json.matchNumber);
})

// Gets the value under the "field" key for a specific team performance
app.get("/getTeamPerformanceField", async (req, res) => {
  const json = req.body;
  return getTeamPerformanceField(json.field, json.tournamentName, json.teamNumber, json.matchNumber);
})

// Creates a new team performance
app.get("/getTeamPerformanceField", async (req, res) => {
  const json = req.body;
  putNewTeamPerformance(json as JsonObject);
})


app.listen(3000, () => {
  console.log("Server started!"); 
}); 

module.exports = app;