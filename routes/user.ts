import express from "express";
import {
  changeUserImageController,
  getUserController,
} from "../controllers/userController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.get("/:nickName", getUserController);
router.put("/:nickName", protect, changeUserImageController);

export default router;
