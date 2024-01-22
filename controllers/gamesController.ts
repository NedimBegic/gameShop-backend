import { Request, Response } from "express";
import {
  getAllGames,
  postGame,
  getSingleGame,
  deleteGame,
  getFIlteredGames,
} from "../model/gamesModel";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { DeleteResult, Game, CustomRequest } from "../utils/types";
import uploadToImgur from "../model/imgur";

// ROUTE: /games,
// METHOD: GET,
// DESC: get all games
export const getAllGamesController = asyncHandler(
  async (req: Request, res: Response, next) => {
    let gamesData: Game[] | undefined;
    if (req.query.role) {
      let role: string = req.query.role as string;
      gamesData = await getFIlteredGames(role);
    } else {
      gamesData = await getAllGames();
    }

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
      return next(new ErrorResponse("There is no such game", 404));
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
  async (req: CustomRequest, res: Response, next) => {
    const textData: Game = { ...req.body, user_id: req.user.user_id };
    const fileData: Express.Multer.File | undefined = req.file;
    if (!textData) {
      return next(new ErrorResponse("There is no game data", 400));
    }
    if (!fileData) {
      return next(new ErrorResponse("There si no image file", 400));
    }
    // Convert file buffer to base64 and upload on imgur
    const base64Data = fileData?.buffer.toString("base64");
    const imageUrl = await uploadToImgur(base64Data);
    // store all data and insert them in to the database
    const gameData: Game = { ...textData, imageUrl };
    const result = await postGame(gameData);
    console.log(result);
    if (!result.success) {
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
  async (req: CustomRequest, res: Response, next) => {
    const gameForDelete = await getSingleGame(req.params.id);
    if (req.user.user_id != gameForDelete?.user_id) {
      return next(
        new ErrorResponse("User not authorized to delete this game", 404)
      );
    }
    const result: DeleteResult[] = await deleteGame(req.params.id);
    if (result[0].affectedRows === 0) {
      return next(new ErrorResponse("There is no game with that id", 404));
    }
    res.status(201).json({
      success: true,
      message: "Game has been deleted",
    });
  }
);
