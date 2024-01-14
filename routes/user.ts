import express, { Request, Response } from "express";
const router = express.Router();
import { loginUser } from "../controllers/userController";

router.post("/login", loginUser);

export default router;
