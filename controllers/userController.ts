import { Request, Response } from "express";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import uploadToImgur from "../model/imgur";
import { getSingleUser } from "../model/userMode";
import { User, Game } from "../utils/types";
import { getUsersGames } from "../model/gamesModel";

// ROUTE: /:nickName;
// METHOD: GET;
// DESC: get single user
export const getUserController = asyncHandler(
  async (req: Request, res: Response, next) => {
    let name = req.params.nickName;
    let user: User | undefined = await getSingleUser(name);
    if (!user) {
      return next(
        new ErrorResponse("There is no user with that nickname", 404)
      );
    }
    let games: Game[] | undefined = await getUsersGames(user.user_id as number);
    res.status(200).json({
      success: true,
      data: {
        nickName: user.nickName,
        email: user.email,
        userImageUrl: user.userImageUrl,
        games: games || [],
      },
    });
  }
);
