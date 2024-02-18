"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getAllGamesController, postGameController, getSingleGameController, deleteSingleGameController, } = require("../controllers/gamesController");
const protect_1 = require("../middleware/protect");
router.get("/", getAllGamesController).post("/", protect_1.protect, postGameController);
router
    .get("/:id", getSingleGameController)
    .delete("/:id", protect_1.protect, deleteSingleGameController);
exports.default = router;
