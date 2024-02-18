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
exports.getLogingUser = exports.saveNewUser = exports.isEmailTaken = exports.isNickNameTaken = void 0;
const db = require("../model/db");
/* +++ Save a new registred user to database */
const saveNewUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickName, email, password, userImageUrl } = userData;
    let sql = "INSERT INTO users (nickName, email, password, userImageUrl) VALUES (?, ?, ?, ?)";
    try {
        const [rows] = yield db.execute(sql, [
            nickName,
            email,
            password,
            userImageUrl,
        ]);
        return { success: true, data: rows };
    }
    catch (err) {
        console.log(err);
        return { success: false, msessage: err };
    }
});
exports.saveNewUser = saveNewUser;
/* +++ Get the loged in user */
const getLogingUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = "SELECT * FROM users WHERE email = ?";
    try {
        const [rows] = yield db.execute(sql, [email]);
        if (rows.length > 0) {
            const userData = rows[0];
            return userData;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getLogingUser = getLogingUser;
/* +++ Check if there is a user with that nickName */
const isNickNameTaken = (nickName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sql = "SELECT * FROM users WHERE nickName = ?";
        const [rows] = yield db.execute(sql, [nickName]);
        // if the array is empty nickName is not taken
        return rows.length === 0 ? false : true;
    }
    catch (error) {
        console.error("Error checking nickname:", error);
        throw error; // Handle the error appropriately in your application
    }
});
exports.isNickNameTaken = isNickNameTaken;
/* +++ Check if there is a user with that email */
const isEmailTaken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sql = "SELECT * FROM users WHERE email = ?";
        const [rows] = yield db.execute(sql, [email]);
        // if the array is empty email is not taken
        return rows.length === 0 ? false : true;
    }
    catch (error) {
        console.error("Error checking email:", error);
        throw error; // Handle the error appropriately in your application
    }
});
exports.isEmailTaken = isEmailTaken;
