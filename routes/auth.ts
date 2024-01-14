import express from "express";
const router = express.Router();
import {
  loginController,
  registerController,
} from "../controllers/authController";

router.post("/login", loginController);
router.post("/register", registerController);

export default router;
