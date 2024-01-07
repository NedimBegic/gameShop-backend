import express, { Request, Response } from "express";
const router = express.Router();
const {
  getAllGamesController,
  postGameController,
} = require("../controllers/gamesController");

router.get("/", getAllGamesController).post("/", postGameController);

export default router;
