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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleGameController = exports.postGameController = exports.getSingleGameController = exports.getAllGamesController = void 0;
const gamesModel_1 = require("../model/gamesModel");
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const imgur_1 = __importDefault(require("../model/imgur"));
// ROUTE: /games,
// METHOD: GET,
// DESC: get all games
exports.getAllGamesController = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let gamesData;
    if (req.query.role) {
        let role = req.query.role;
        gamesData = yield (0, gamesModel_1.getFIlteredGames)(role);
    }
    else {
        gamesData = yield (0, gamesModel_1.getAllGames)();
    }
    // there are no games
    if (!gamesData || gamesData.length === 0) {
        return next(new errorResponse_1.default("There are no games", 404));
    }
    res.status(200).json({ success: true, data: gamesData });
}));
// ROUTE: /games:id
// METHOD: GET,
// DESC: get single game
exports.getSingleGameController = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, gamesModel_1.getSingleGame)(req.params.id);
    if (!result) {
        return next(new errorResponse_1.default("There is no such game", 404));
    }
    res.status(201).json({
        success: true,
        data: result,
    });
}));
// ROUTE: /games
// METHOD: POST,
// DESC: post a single game
exports.postGameController = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const textData = Object.assign(Object.assign({}, req.body), { user_id: req.user.user_id });
    const fileData = req.file;
    if (!textData) {
        return next(new errorResponse_1.default("There is no game data", 400));
    }
    if (!fileData) {
        return next(new errorResponse_1.default("There si no image file", 400));
    }
    // Convert file buffer to base64 and upload on imgur
    const base64Data = fileData === null || fileData === void 0 ? void 0 : fileData.buffer.toString("base64");
    const imageUrl = yield (0, imgur_1.default)(base64Data);
    // store all data and insert them in to the database
    const gameData = Object.assign(Object.assign({}, textData), { imageUrl });
    const result = yield (0, gamesModel_1.postGame)(gameData);
    console.log(result);
    if (!result.success) {
        return next(new errorResponse_1.default("The game could't post", 404));
    }
    res.status(201).json({
        success: result.success,
        message: result.message,
    });
}));
// ROUTE: /games/:id
// METHOD: DELETE,
//DESC: delete a single game
exports.deleteSingleGameController = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const gameForDelete = yield (0, gamesModel_1.getSingleGame)(req.params.id);
    if (req.user.user_id != (gameForDelete === null || gameForDelete === void 0 ? void 0 : gameForDelete.user_id)) {
        return next(new errorResponse_1.default("User not authorized to delete this game", 404));
    }
    const result = yield (0, gamesModel_1.deleteGame)(req.params.id);
    if (result[0].affectedRows === 0) {
        return next(new errorResponse_1.default("There is no game with that id", 404));
    }
    res.status(201).json({
        success: true,
        message: "Game has been deleted",
    });
}));
