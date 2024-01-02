import express, { Request, Response } from "express";
const router = express.Router();
const { getAllGamesController } = require("../controllers/gamesController");

router.get("/", getAllGamesController);

export default router;
