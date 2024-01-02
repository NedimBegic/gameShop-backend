// In games.ts
const db = require("../model/db");
import { Game } from "../utils/types";

const getAllGames = async (): Promise<Game[] | undefined> => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM games");
    let games: Game[] = rows;
    return games;
  } catch (err) {
    console.log(err);
  }
};

export { getAllGames };
