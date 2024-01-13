import express from "express";
import PostController from "../controllers/post.controller";

const router = express.Router();

router.post("/addTeamMatch", PostController.addTeamMatch);


// Returns an array of values for one specific field for a team in a specific tournament
