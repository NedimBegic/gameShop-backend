import { Request, Response } from "express";
import { getAllGames } from "../model/gamesModel";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { Game } from "../utils/types";

export const getAllGamesController = asyncHandler(
  async (req: Request, res: Response, next) => {
    let gamesData: Game[] | undefined | string = await getAllGames();
    // there is no games
    if (!gamesData || gamesData.length === 0) {
      return next(new ErrorResponse("There are no games", 404));
    }
    // there are games (convert to json)
    gamesData = JSON.stringify(gamesData);

    res.status(200).send(gamesData);
  }
);
