// In games.ts
const db = require("../model/db");

const getAllGames = async () => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM games");
    const games = JSON.stringify(rows);
    return games;
  } catch (err) {
    console.log(err);
  }
};

/* module.exports = {
  getAllGames,
}; */

export { getAllGames };
