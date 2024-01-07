import { Request, Response } from "express";
import { getAllGames, postGame } from "../model/gamesModel";
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

// ROUTE: /games
// METHOD: POST,
// DESC: post a single game
export const postGameController = asyncHandler(
  async (req: Request, res: Response, next) => {
    const gameData: Game = req.body;
    const result = await postGame(gameData);
    console.log(result.insertedId);
    res.status(201).json({
      success: result.success,
      message: result.message,
    });
  }
);
