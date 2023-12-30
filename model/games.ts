const db = require("../model/db");

const getAllGames = async () => {
  try {
    const [rows, fields] = db.execute("SELECT * FROM games");
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllGames,
};
