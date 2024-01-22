import express, { Request, Response } from "express";
const router = express.Router();
const {
  getAllGamesController,
  postGameController,
  getSingleGameController,
  deleteSingleGameController,
} = require("../controllers/gamesController");
import { protect } from "../middleware/protect";

router.get("/", getAllGamesController).post("/", protect, postGameController);
router
  .get("/:id", getSingleGameController)
  .delete("/:id", protect, deleteSingleGameController);

export default router;
