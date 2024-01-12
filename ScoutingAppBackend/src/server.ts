import express from "express"
import bodyParser from "body-parser";
import { prisma } from "./index";

const app = express();
app.use(bodyParser.json());

// Adds a team performance to the database
app.post("/addTeamMatch", async (req, res) => {
  const json = req.body;

  // json
  // {
  //   teamNumber: 321, 
  //   matchNumber: 12, 
  //   tournamentName: ""
  //       intValues: [],
  //       stringValues: [],
  //       doublevalues: [],
  // }

  // TODO: Require that a schema must be written with a teamNumber, tournamentId, and a matchNumber in specified way

  // Creates a new team performance based on the input given in the json file from the scout
  // The json file will be converted from the qr code and fed to this as input

    // Creates a match if one does not exist with needed match number
  // TODO: See if tournament ID needs to be an input

  // Sees if match exists

  // Creates a tournament if it does not exist for the input team performance
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

  // TODO: Create a parse schema thing that separates json into int, double, and string
  const teamPerf = await prisma.teamPerformance.create({
    data: {
      teamNumber: json.teamNumber,
      jsonScoutInput: json.jsonValues,
      matchId: match.id
    },
  });


  return res.json(teamPerf); 
}),

app.get("/getSpecificTeamPerformance", async (req, res) => {
  const json = req.body;
  // console.log(json);
  const posts = await prisma.teamPerformance.findMany({
    where: {
       teamNumber: json.teamNumber,
       match: { tournamentId: json.tournamentId , matchNumber: json.MatchNumber}
    },
  })
  console.log("Yo ", posts);
  return res.json(posts);
}),

app.get("/getTeamMatchNumbers", async (req, res) => {
  const json = req.body;
  const posts = await prisma.teamPerformance.findMany({
    where: {
      teamNumber: json.teamNumber,
      match: {tournamentId: json.tournamentId}
    }
  })
  console.log("Ha ", posts);
  return res.json(posts);
}),

app.get("/getSpecificMatch", async (req, res) => {
  const json = req.body;
  const posts = await prisma.teamPerformance.findMany({
    where: {
      match: {tournamentId: json.tournamentId, matchNumber: json.matchNumber}
    }
  })
  console.log("Wow ", posts);
  return res.json(posts);
})

app.listen(3000, () => {
  console.log("Server started!"); 
}); 

module.exports = app;