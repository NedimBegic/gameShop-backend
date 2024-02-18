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
exports.changeUserImageController = exports.getUserController = void 0;
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const userMode_1 = require("../model/userMode");
const gamesModel_1 = require("../model/gamesModel");
const uploadToImgur = require("../model/imgur");
// ROUTE: /:nickName;
// METHOD: GET;
// DESC: get single user
exports.getUserController = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.params.nickName;
    let user = yield (0, userMode_1.getSingleUser)(name);
    if (!user) {
        return next(new errorResponse_1.default("There is no user with that nickname", 404));
    }
    let games = yield (0, gamesModel_1.getUsersGames)(user.user_id);
    res.status(200).json({
        success: true,
        data: {
            nickName: user.nickName,
            email: user.email,
            userImageUrl: user.userImageUrl,
            games: games || [],
        },
    });
}));
// ROUTE: /:nickName,
// METHID: PUT,
// DESC: change user image
exports.changeUserImageController = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let fileData = req.file;
    if (!fileData) {
        return next(new errorResponse_1.default("There is no uploaded image", 404));
    }
    const base64Data = fileData === null || fileData === void 0 ? void 0 : fileData.buffer.toString("base64");
    const newImage = yield uploadToImgur(base64Data);
    let nickName = req.user.nickName;
    let result = yield (0, userMode_1.uploadUserImage)(newImage, nickName);
    if (!result.success) {
        return res.json({
            success: false,
            message: result.message || "Some default error message",
        });
    }
    return res.json({
        success: true,
        message: "User image succesfully uploaded!",
    });
}));
