import { Request, Response } from "express";
import {
  getAllGames,
  postGame,
  getSingleGame,
  deleteGame,
} from "../model/gamesModel";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { DeleteResult, Game } from "../utils/types";

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
    res.status(200).json({ success: true, data: gamesData });
  }
);

// ROUTE: /games:id
// METHOD: GET,
// DESC: get single game
export const getSingleGameController = asyncHandler(
  async (req: Request, res: Response, next) => {
    const result: Game | undefined = await getSingleGame(req.params.id);
    if (!result) {
      return next(new ErrorResponse("There is no such game", 400));
    }
    res.status(201).json({
      success: true,
      data: result,
    });
  }
);

// ROUTE: /games
// METHOD: POST,
// DESC: post a single game
export const postGameController = asyncHandler(
  async (req: Request, res: Response, next) => {
    const gameData: Game = req.body;
    const result = await postGame(gameData);
    if (result.success) {
      return next(new ErrorResponse("The game could't post", 404));
    }
    res.status(201).json({
      success: result.success,
      message: result.message,
    });
  }
);

// ROUTE: /games/:id
// METHOD: DELETE,
//DESC: delete a single game
export const deleteSingleGameController = asyncHandler(
  async (req: Request, res: Response, next) => {
    const result: DeleteResult = await deleteGame(req.params.id);
    if (result.affectedRows === 0) {
      return next(new ErrorResponse("There is no game with that id", 400));
    }
    res.status(201).json({
      success: true,
      message: "Game has been deleted",
    });
  }
);
