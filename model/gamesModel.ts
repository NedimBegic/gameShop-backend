// In games.ts
const db = require("../model/db");
import { Game, PostGameResult, DeleteResult } from "../utils/types";

// get all games
const getAllGames = async (): Promise<Game[] | undefined> => {
  try {
    const [rows, fields] = await db.execute(
      " SELECT games.*, users.nickName FROM games JOIN users ON games.user_id = users.user_id"
    );
    let games: Game[] = rows;
    return games;
  } catch (err) {
    console.log(err);
  }
};

// get all games from one user
const getUsersGames = async (userId: number): Promise<Game[] | undefined> => {
  let sql =
    "SELECT name, price, description, image, date, role FROM games WHERE user_id = ?";
  try {
    let [rows] = await db.execute(sql, [userId]);
    let games: Game[] = rows;
    return games;
  } catch (err) {
    console.log(err);
  }
};

// get all games by filter
const getFIlteredGames = async (role: string): Promise<Game[] | undefined> => {
  let sql =
    "SELECT games.*, users.nickName FROM games JOIN users ON games.user_id = users.user_id WHERE role = ?";
  try {
    const [rows] = await db.execute(sql, [role]);
    let games: Game[] = rows;
    return games;
  } catch (err) {
    console.log(err);
  }
};
// get a single game
const getSingleGame = async (gameId: string): Promise<Game | undefined> => {
  try {
    const sql = `SELECT games.*, users.nickName FROM games JOIN users ON games.user_id = users.user_id WHERE id = ?`;
    const [rows]: [Game[]] = await db.execute(sql, [gameId]);
    const gameData: Game = rows[0];
    return gameData;
  } catch (err) {
    console.log(err);
  }
};

// post a game
const postGame = async (gameData: Game): Promise<PostGameResult> => {
  const { name, price, description, imageUrl, date, role, user_id } = gameData;
  try {
    const sql =
      "INSERT INTO games (name, price, description, image, date, role, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result]: any = await db.execute(sql, [
      name,
      price,
      description,
      imageUrl,
      date,
      role,
      user_id,
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

// delete a game
const deleteGame = async (gameId: string): Promise<DeleteResult[]> => {
  try {
    const sql = `DELETE FROM games WHERE id = ?`;
    const result: DeleteResult[] = db.execute(sql, [gameId]);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export {
  getAllGames,
  getSingleGame,
  postGame,
  deleteGame,
  getFIlteredGames,
  getUsersGames,
};
