import express, { Request, Response } from "express";
const router = express.Router();
import {
  changeUserImageController,
  getUserController,
} from "../controllers/userController";
import { protect } from "../middleware/protect";

router
  .get("/:nickName", getUserController)
  .put("/:nickName", protect, changeUserImageController);

export default router;
