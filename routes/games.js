"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gamesController_js_1 = require("../controllers/gamesController.js");
const protect_js_1 = require("../middleware/protect.js");
const router = express_1.default.Router();
router.get("/", gamesController_js_1.getAllGamesController).post("/", protect_js_1.protect, gamesController_js_1.postGameController);
router
    .get("/:id", gamesController_js_1.getSingleGameController)
    .delete("/:id", protect_js_1.protect, gamesController_js_1.deleteSingleGameController);
exports.default = router;
