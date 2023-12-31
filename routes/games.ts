import express, { Request, Response } from "express";
import { deleteSingleGameController } from "../controllers/gamesController";
const router = express.Router();
const {
  getAllGamesController,
  postGameController,
  getSingleGameController,
} = require("../controllers/gamesController");

router.get("/", getAllGamesController).post("/", postGameController);
router
  .get("/:id", getSingleGameController)
  .delete("/:id", deleteSingleGameController);

export default router;
