"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const protect_js_1 = require("../middleware/protect.js");
const router = express_1.default.Router();
router.get("/:nickName", userController_js_1.getUserController);
router.put("/:nickName", protect_js_1.protect, userController_js_1.changeUserImageController);
exports.default = router;
