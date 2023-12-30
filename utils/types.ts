import { Request, Response, NextFunction } from "express";
// type of async function
type AsyncFun = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export { AsyncFun };
