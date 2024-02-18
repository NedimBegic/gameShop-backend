"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersGames = exports.getFIlteredGames = exports.deleteGame = exports.postGame = exports.getSingleGame = exports.getAllGames = void 0;
// In games.ts
const db = require("../model/db");
// get all games
const getAllGames = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows, fields] = yield db.execute(" SELECT games.*, users.nickName FROM games JOIN users ON games.user_id = users.user_id");
        let games = rows;
        return games;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAllGames = getAllGames;
// get all games from one user
const getUsersGames = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = "SELECT name, price, description, image, date, role FROM games WHERE user_id = ?";
    try {
        let [rows] = yield db.execute(sql, [userId]);
        let games = rows;
        return games;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getUsersGames = getUsersGames;
// get all games by filter
const getFIlteredGames = (role) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = "SELECT games.*, users.nickName FROM games JOIN users ON games.user_id = users.user_id WHERE role = ?";
    try {
        const [rows] = yield db.execute(sql, [role]);
        let games = rows;
        return games;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getFIlteredGames = getFIlteredGames;
// get a single game
const getSingleGame = (gameId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT games.*, users.nickName FROM games JOIN users ON games.user_id = users.user_id WHERE id = ?`;
        const [rows] = yield db.execute(sql, [gameId]);
        const gameData = rows[0];
        return gameData;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getSingleGame = getSingleGame;
// post a game
const postGame = (gameData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, imageUrl, date, role, user_id } = gameData;
    try {
        const sql = "INSERT INTO games (name, price, description, image, date, role, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const [result] = yield db.execute(sql, [
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
            message: result.affectedRows === 1
                ? "Game added successfully"
                : "Failed to add the game",
            insertedId: result.insertId || undefined,
        };
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
exports.postGame = postGame;
// delete a game
const deleteGame = (gameId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `DELETE FROM games WHERE id = ?`;
        const result = db.execute(sql, [gameId]);
        return result;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.deleteGame = deleteGame;
