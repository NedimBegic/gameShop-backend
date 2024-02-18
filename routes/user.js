"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const protect_1 = require("../middleware/protect");
router
    .get("/:nickName", userController_1.getUserController)
    .put("/:nickName", protect_1.protect, userController_1.changeUserImageController);
exports.default = router;
