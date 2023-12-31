import express from "express"
import bodyParser from "body-parser";
import { prisma } from "./index";

const app = express();
app.use(bodyParser.json());

// Adds a team performance to the database
app.post("/addTeamMatch", async (req, res) => {
  const json = req.body;

  // json
  /*
  {
    teamNumber: 321, 
    matchNumber: 12, 
    tournamentName: ""
        intValues: [],
        stringValues: [],
        doublevalues: [],

    
    
  }
  
  */

  // TODO: Require that a schema must be written with a teamNumber and a matchNumber in specified way

  // Creates a new team performance based on the input given in the json file from the scout
  // The json file will be converted from the qr code and fed to this as input

    // Creates a match if one does not exist with needed match number
  // TODO: See if tournament ID needs to be an input

  // Sees if match exists
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
  console.log(tournament);

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
  console.log(match); 

  // TODO: Create a parse schema thing that separates json into int, double, and string
  const teamPerf = await prisma.teamPerformance.create({
    data: {
      teamNumber: json.teamNumber,
      intScoutInput: json.intValues,
      booleanScoutInput: json.booleanValues,
      stringScoutInput: json.stringValues,
      matchId: match.id
    },
  });
  console.log(teamPerf); 

  res.send(); 
}),

app.get("/getTeamPerformanceIntArray", async (req, res) +> {
  const posts = await.prisma.post.findMany({
    where: {},

  })
  res.json(posts)
})

// TODO: Add queries or requests

app.listen(3000, () => {
  console.log("Server started!"); 
}); 

module.exports = app;