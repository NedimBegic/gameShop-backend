"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const makeJwt = (userData) => {
    const options = { expiresIn: "30d" };
    // Check if JWT_SECRET is defined
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET is not defined");
        return undefined; // or throw an error, depending on your error handling strategy
    }
    const token = jsonwebtoken_1.default.sign(userData, secret, options);
    return token;
};
exports.default = makeJwt;
