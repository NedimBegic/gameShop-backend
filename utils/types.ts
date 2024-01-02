import { Request, Response, NextFunction } from "express";
// type of async function for controllers without try and catch
type AsyncFun = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;
// Games
interface Game {
  id: number;
  name: string;
  description: string;
  release_date: Date;
  role: string;
}

export { AsyncFun, Game };
