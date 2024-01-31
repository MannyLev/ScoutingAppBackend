import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import { prisma } from "./index";
import { getFieldArray } from "./getFieldArray";
import { getMatchFields } from "./getMatchFields";
import { getTeamFields } from "./getTeamFields";
import { getTeamPerformanceField } from "./getTeamPerformanceField";
import { putNewTeamPerformance } from "./putNewTeamPerformance";
import { JsonObject, JsonValue } from "@prisma/client/runtime/library";

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: "*"
}));

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
  console.log("In Too Deep by Sum 41 and tournament added ", tournament);

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
  console.log("Semi-Charmed Life by Third Eye Blind and match added ", match); 

  // Creates a new team performance based on the input given in the json file from the scout
  // TODO: The json file will be converted from the qr code and fed to this as input
  const teamPerf = await prisma.teamPerformance.create({
    data: {
      teamNumber: json.teamNumber,
      jsonScoutInput: json.jsonValues,
      matchId: match.id
    },
  });
  console.log("Breakfast at Tiffany's by Deep Blue Something and team performance added ", teamPerf);
  return res.json(teamPerf); 
}),

// Gets a specific team performance for a given tournament, match number, and team number
app.get("/getTeamPerformance", async (req, res) => {
  const json = req.body;
  console.log("Bark At The Moon by Ozzy Osbourne and tournament requested ", json.tournamentName);
  console.log("Blackout by Scorpions and match number requested ", json.matchNumber);
  console.log("In My Dreams by Dokken and team number requested ", json.teamNumber);
  const posts = await prisma.teamPerformance.findMany({
    where: {
       teamNumber: json.teamNumber,
       match: { tournament: {title: json.tournamentName}, matchNumber: json.matchNumber}
    },
  })
  console.log("Shake Me by Cinderella and posts found ", posts);
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
  console.log("Kickstart My Heart by Motley Crue and posts found ", posts);
  return res.json(posts);
}),

// Gets all the team performances for a specific match
app.get("/getMatch", async (req, res) => {
  const json = req.body;
  const posts = await prisma.teamPerformance.findMany({
    where: {
      match: {tournament: {title: json.tournamentName}, matchNumber: json.matchNumber}
    }
  })
  console.log("Poison by Alice Cooper and posts found ", posts);
  return res.json(posts);
})

// Gets all of the values under the "field" key for a specific team
app.get("/getTeamFields", async (req, res) => {
  const json = req.body;
  const data = await getTeamFields(json.field, json.tournamentName, json.teamNumber);
  console.log("Nothin' But A Good Time by Poison and values found ", (await data).toString());
  res.status(200).json({
    data: data
  }).end(); 
})

// Gets all of the values under the "field" key for a specific match
app.get("/getMatchFields", async (req, res) => {
  const json = req.body;
  console.log("Army of the Night by Powerwolf and items requested ", json);
  const data = await getMatchFields(json.field, json.tournamentName, json.matchNumber);
  res.status(200).json({
    data: data
  }).end(); 
})

// Gets the value under the "field" key for a specific team performance
app.get("/getTeamPerformanceField", async (req, res) => {
  const json = req.body;
  console.log(json);
  console.log("Heartwork by Carcass and items requested ", json);
  const data = await getTeamPerformanceField(json.field, json.tournamentName, json.teamNumber, json.matchNumber);
  res.status(200).json({
    data: data
  }).end(); 
})

// Creates a new team performance
app.post("/putNewTeamPerformance", async (req, res) => {
  const json = req.body;

  await putNewTeamPerformance(json);
  console.log("The Bard's Song in the Forest by Blind Guardian and team performance added ", req.body);
  res.status(200).end();
})

app.get("/", async (req, res) => {
  res.send("Welcome to the scouting app backend")
})

app.listen(3000, () => {
  console.log("Hearts on Fire by Hammerfall and Server Started!"); 
}); 

module.exports = app;

// TODO: Possibly filters for getting as parameters
// TODO: Handle errors and faulty data inputs