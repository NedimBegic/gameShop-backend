// In games.ts
const db = require("../model/db");
import { Game, PostGameResult } from "../utils/types";

// get all games
const getAllGames = async (): Promise<Game[] | undefined> => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM games");
    let games: Game[] = rows;
    return games;
  } catch (err) {
    console.log(err);
  }
};

// post a game
const postGame = async (gameData: Game): Promise<PostGameResult> => {
  const { name, price, description, image, date, role } = gameData;
  try {
    const sql =
      "INSERT INTO games (name, price, description, image, date, role) VALUES (?, ?, ?, ?, ?, ?)";
    const [result]: any = await db.execute(sql, [
      name,
      price,
      description,
      image,
      date,
      role,
    ]);

    return {
      success: result.affectedRows === 1,
      message:
        result.affectedRows === 1
          ? "Game added successfully"
          : "Failed to add the game",
      insertedId: result.insertId || undefined,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export { getAllGames, postGame };
