import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";

const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;
  res
    .status(error.statusCode || 500)
    .json({ success: false, message: error.message || "Server Error" });
};

export = errorHandler;
