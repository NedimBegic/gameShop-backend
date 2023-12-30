import { Request, Response, NextFunction } from "express";
import { AsyncFun } from "../utils/types";

const asyncHandler =
  (fn: AsyncFun) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
