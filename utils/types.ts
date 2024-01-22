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
  imageUrl: string;
  date: Date;
  role: string;
  user_id?: number;
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
// for registering user
interface RegisteringUser {
  nickName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
// for user
interface User {
  user_id?: number;
  nickName: string;
  email: string;
  password: string;
  userImageUrl: string;
}
interface CustomRequest extends Request {
  user?: any;
}

export {
  AsyncFun,
  Game,
  PostGameResult,
  DeleteResult,
  RegisteringUser,
  User,
  CustomRequest,
};
