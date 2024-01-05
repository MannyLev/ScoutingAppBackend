var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import bodyParser from "body-parser";
import { prisma } from "./index.js";
const app = express();
app.use(bodyParser.json());
// Adds a team performance to the database
app.post("/addTeamMatch", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const json = req.body;
    // TODO: Require that a schema must be written with a teamNumber and a matchNumber in specified way
    // Creates a new team performance based on the input given in the json file from the scout
    // The json file will be converted from the qr code and fed to this as input
    // TODO: Create a parse schema thing that separates json into int, double, and string
    const teamPerf = yield prisma.teamPerformance.create({
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
    const matchExists = (yield prisma.match.findMany({
        where: {
            tournament: { title: json.tournamentName }, // TODO: Fix this
            matchNumber: json.scoutInput.matchNumber,
        },
    }))[0];
    // Creates one if it doesn't
    if ((matchExists == null) || (matchExists == undefined)) {
        const matchCreation = yield prisma.match.create({
            data: {
                matchNumber: json.scoutInput.matchNumber,
                teams: {
                    connect: { id: teamPerf.id },
                },
            }
        });
        // Sees if tournament exists
        const tournamentExists = (yield prisma.tournament.findMany({
            where: {
                title: json.tournamentName,
            },
        }))[0];
        if ((tournamentExists == null) || (tournamentExists == undefined)) {
            const tournamentCreation = yield prisma.tournament.create({
                data: {
                    title: json.tournamentName,
                    schema: [], //!! TODO: fix this to valid schema
                    matches: undefined
                }
            });
            const matchUpdateTournament = yield prisma.match.update({
                where: {
                    id: matchCreation.id,
                },
                data: {
                    tournamentId: tournamentCreation.id,
                },
            });
            const updateTournament = yield prisma.tournament.update({
                where: {
                    id: tournamentCreation.id,
                },
                data: {
                    matches: {
                        connect: { id: matchCreation.id },
                    },
                },
            });
        }
        else {
            console.log("tournament id is " + tournamentExists.id);
            const tournamentUpdate = yield prisma.tournament.update({
                where: {
                    id: tournamentExists.id,
                },
                data: {}
            });
            const matchUpdateTournament = yield prisma.match.update({
                where: {
                    id: matchCreation.id,
                },
                data: {
                    tournamentId: tournamentExists.id,
                },
            });
            console.log("tournament id is " + (tournamentUpdate === null || tournamentUpdate === void 0 ? void 0 : tournamentUpdate.id));
            const updateTournament = yield prisma.tournament.update({
                where: {
                    id: tournamentUpdate.id,
                },
                data: {
                    matches: {
                        connect: { id: matchCreation.id },
                    },
                },
            });
        }
        // Update tournament with match
    }
    else {
        const matchUpdate = yield prisma.match.update({
            where: {
                id: matchExists.id,
            },
            data: {
                teams: {
                    connect: { id: teamPerf.id },
                },
            },
        });
        const updateTournament = yield prisma.tournament.update({
            where: {
                id: matchExists.tournamentId, // TODO: Set tournament ID
            },
            data: {
                matches: {
                    connect: { id: matchUpdate.id },
                },
            },
        });
    }
    res.send();
})),
    // Adds a new tournament
    /* app.post("/addTournament", async (req, res) => {
      const json = req.body;
  
      const tournament = await prisma.tournament.create({
        data: {},
      });
    }); */
    // TODO: Add queries or requests
    module.exports = app;
