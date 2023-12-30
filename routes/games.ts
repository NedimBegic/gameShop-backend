import express, { Request, Response } from "express";
const router = express.Router();
const { getAllGamesController } = require("../controllers/gamesController");

router.get("/games", getAllGamesController);

export default router;
