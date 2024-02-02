import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import { prisma } from "./index";
import { getFieldArray } from "./getFieldArray";
import { getMatchFields } from "./getMatchFields";
import { getTeamFields } from "./getTeamFields";
import { getTeamPerformanceField } from "./getTeamPerformanceField";
import { getMatch } from "./getMatch"
import { getMatchNumbersForTeam } from "./getMatchNumbersForTeam";
import { getRecordsCount } from "./getRecordsCount";
import { putNewTeamPerformance } from "./putNewTeamPerformance";
import { JsonObject, JsonValue } from "@prisma/client/runtime/library";
import { getTeamMatches } from "./getTeamMatches";
import { getTeamNames } from "./getTeamNames";
import { getTeamNamesForMatchNumber } from "./getTeamNamesForMatchNumber";
import { getTeamPerformance } from "./getTeamPerformance";

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: "*"
}));

// Gets all of the values under the "field" key for a specific team
app.post("/getTeamFields", async (req, res) => {
  const json = req.body;
  const data = await getTeamFields(json.field, json.tournamentName, json.teamNumber);
  console.log("Nothin' But A Good Time by Poison and values found ", (await data).toString());
  res.status(200).json({
    data: data
  }).end(); 
})

// Gets all of the values under the "field" key for a specific match
app.post("/getMatchFields", async (req, res) => {
  const json = req.body;
  console.log("Army of the Night by Powerwolf and items requested ", json);
  const data = await getMatchFields(json.field, json.tournamentName, json.matchNumber);
  res.status(200).json({
    data: data
  }).end();
})

// Gets the value under the "field" key for a specific team performance
app.post("/getTeamPerformanceField", async (req, res) => {
  const json = req.body;
  console.log(json);
  console.log("Heartwork by Carcass and items requested ", json);
  const data = await getTeamPerformanceField(json.field, json.tournamentName, json.teamNumber, json.matchNumber);
  res.status(200).json({
    data: data
  }).end(); 
})

// Gets all of the team performances for a specific match
app.post("/getMatch", async (req, res) => {
  const json = req.body;
  const data = await getMatch(json.tournamentName, json.matchNumber);
  res.status(200).json({
    data: data
  }).end(); 
})

// Gets a specific team performance
app.post("/getTeamPerformance", async (req, res) => {
  const json = req.body;
  const data = await getTeamPerformance(json.tournamentName, json.matchNumber, json.teamNumber);
  res.status(200).json({
    data: data
  }).end(); 
})

// Gets the match numbers for a specific team
app.post("/getMatchNumbersForTeam", async (req, res) => {
  const json = req.body;
  const data = await getMatchNumbersForTeam(json.tournamentName, json.teamNumber);
  res.status(200).json({
    data: data
  }).end(); 
})

// Gets the names of teams involved in a specific match
app.post("/getTeamNamesForMatchNumber", async (req, res) => {
  const json = req.body;
  const data = await getTeamNamesForMatchNumber(json.tournamentName, json.matchNumber);
  res.status(200).json({
    data: data
  }).end(); 
})

// Returns the number of team performances for a specific team in a specific match for a specific tournament
app.post("/getRecordsCount", async (req, res) => {
  const json = req.body;
  const data = await getRecordsCount(json.tournamentName, json.matchNumber, json.teamNumber);
  res.status(200).json({
    data: data
  }).end(); 
})

// Returns all the team performances for a specific team
app.post("/getTeamMatches", async (req, res) => {
  const json = req.body;
  const data = await getTeamMatches(json.tournamentName, json.teamNumber);
  res.status(200).json({
    data: data
  }).end(); 
})

// Returns all of the team names in a given tournament
app.post("/getTeamNames", async (req, res) => {
  const json = req.body;
  const data = await getTeamNames(json.tournamentName);
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

/* 
TODO List:
Handle errors and faulty inputs
Not for me: require that schemas have tournament name, matchnumber, team number
*/ 

// get match numbers overall
// get maximums -> how do you handle sliders out of ten?
// get averages for entire schema