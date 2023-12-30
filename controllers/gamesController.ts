import { Request, Response } from "express";
const { getAllGames } = require("../model/gamesModel");

export const getAllGamesController = async (req: Request, res: Response) => {
  const gamesData = await getAllGames();
  res.send(gamesData);
};
