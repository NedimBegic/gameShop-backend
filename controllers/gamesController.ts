import { Request, Response } from "express";
import { getAllGames } from "../model/gamesModel";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { Game } from "../utils/types";

// ROUTE: /games,
// METHOD: GET,
// DESC: get all games
export const getAllGamesController = asyncHandler(
  async (req: Request, res: Response, next) => {
    let gamesData: Game[] | undefined = await getAllGames();
    // there are no games
    if (!gamesData || gamesData.length === 0) {
      return next(new ErrorResponse("There are no games", 404));
    }
    res.status(200).json(gamesData);
  }
);
