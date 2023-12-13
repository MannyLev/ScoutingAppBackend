import express from "express"
import { PrismaClient } from '@prisma/client'
import bodyParser from "body-parser";
const prisma = new PrismaClient()
const app = express();
app.use(bodyParser.json());

// Adds a team performance to the database
app.post("/addTeamMatch", async (req, res) => {
  const json = req.body;

  // TODO: Require that a schema must be written with a teamNumber and a matchNumber in specified way

  // Creates a new team performance based on the input given in the json file from the scout
  // The json file will be converted from the qr code and fed to this as input

  // TODO: Create a parse schema thing that separates json into int, double, and string
  const teamPerf = await prisma.teamPerformance.create({
    data: {
      teamNumber: json.teamNumber,
      intScoutInput: json.scoutInput,
      doubleScoutInput: json.scoutInput,
      stringScoutInput: json.scoutInput
    },
  });

  // Creates a match if one does not exist with needed match number
  // TODO: See if tournament ID needs to be an input

  // Sees if match exists
  const matchExists = (await prisma.match.findMany({
    where: {
      tournament: { title: json.tournamentName }, // TODO: Fix this
      matchNumber: json.scoutInput.matchNumber,
    },
  }))[0];

  // Creates one if it doesn't
  if ((matchExists == null) || (matchExists == undefined)) {
    const matchCreation = await prisma.match.create({
      data: {
        matchNumber: json.scoutInput.matchNumber,
        teams: {
          connect: {id: teamPerf.id},
        },
      }
    });

    // Sees if tournament exists
    const tournamentExists = (await prisma.tournament.findMany({
      where: {
        title: json.tournamentName,
      },
    }))[0];

    if ((tournamentExists == null) || (tournamentExists == undefined)) {
      const tournamentCreation = await prisma.tournament.create({
        data: {
          title: json.tournamentName,
          schema: [], //!! TODO: fix this to valid schema
        matches: undefined
        }
      });
      const matchUpdateTournament = await prisma.match.update({
        where: {
          id: matchCreation.id,
        },
        data: {
          tournamentId: tournamentCreation.id,
        },
      });
      const updateTournament = await prisma.tournament.update({
        where: {
          id: tournamentCreation.id,
        },
        data: {
          matches: {
            connect: {id: matchCreation.id},
          },
        },
      });
    } else {
      console.log("tournament id is " + tournamentExists.id);

      const tournamentUpdate = await prisma.tournament.update({
        where: {
          id: tournamentExists.id,
        }, 
        data: {

        }
      });

      const matchUpdateTournament = await prisma.match.update({
        where: {
          id: matchCreation.id,
        },
        data: {
          tournamentId: tournamentExists.id,
        },
      });
    console.log("tournament id is " + tournamentUpdate?.id);

    const updateTournament = await prisma.tournament.update({
      where: {
        id: tournamentUpdate.id,
      },
      data: {
        matches: {
          connect: {id: matchCreation.id},
        },
      },
    });}

    // Update tournament with match
  } else {
    const matchUpdate = await prisma.match.update({
      where: {
        id: matchExists.id,
      },
      data: {
        teams: {
          connect: {id: teamPerf.id},
        },
      },
    });

    const updateTournament = await prisma.tournament.update({
      where: {
        id: matchExists.tournamentId as number, // TODO: Set tournament ID
      },
      data: {
        matches: {
          connect: {id: matchUpdate.id},
        },
      },
    });
  }
  res.send(); 
}),

  // Adds a new tournament
  app.post("/addTournament", async (req, res) => {
    const json = req.body;

    const tournament = await prisma.tournament.create({
      data: {},
    });
  });

// TODO: Add queries or requests

module.exports = app;