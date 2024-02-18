import express from "express";
import {
  getAllGamesController,
  postGameController,
  getSingleGameController,
  deleteSingleGameController,
} from "../controllers/gamesController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.get("/", getAllGamesController).post("/", protect, postGameController);
router
  .get("/:id", getSingleGameController)
  .delete("/:id", protect, deleteSingleGameController);

export default router;
