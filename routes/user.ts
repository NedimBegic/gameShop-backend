import express, { Request, Response } from "express";
const router = express.Router();
import { getUserController } from "../controllers/userController";

router.get("/:nickName", getUserController);

export default router;
