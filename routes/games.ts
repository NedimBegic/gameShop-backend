import express, { Request, Response } from "express";
import { deleteSingleGameController } from "../controllers/gamesController";
const router = express.Router();
const {
  getAllGamesController,
  postGameController,
  getSingleGameController,
} = require("../controllers/gamesController");
import { protect } from "../middleware/protect";

router.get("/", getAllGamesController).post("/", protect, postGameController);
router
  .get("/:id", getSingleGameController)
  .delete("/:id", protect, deleteSingleGameController);

export default router;
