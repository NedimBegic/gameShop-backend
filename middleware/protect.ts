import Jwt, { Secret } from "jsonwebtoken";
import asyncHandler from "./async";
import ErrorResponse from "../utils/errorResponse";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { CustomRequest } from "../utils/types";
dotenv.config();

export const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next) => {
    let token: string | undefined;
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new ErrorResponse("No token", 401));
    }
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET as Secret);
      req.user = decoded;
      console.log(req.user);
      next();
    } catch (err) {
      console.log(err);
    }
  }
);
