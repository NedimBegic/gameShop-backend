import { Request, Response, NextFunction } from "express";
// type of async function for controllers without try and catch
type AsyncFun = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;
// Games
interface Game {
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  date: Date;
  role: string;
}
// data for inserted game
interface PostGameResult {
  success: boolean;
  message: string;
  insertedId?: number;
}
// for deleted resoult
interface DeleteResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}
export { AsyncFun, Game, PostGameResult, DeleteResult };
