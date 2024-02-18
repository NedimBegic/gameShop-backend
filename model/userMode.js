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
exports.uploadUserImage = exports.getSingleUser = void 0;
const db = require("../model/db");
// search for a user in database
const getSingleUser = (nickName) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = "SELECT * FROM users WHERE nickName = ?";
    try {
        let [rows] = yield db.execute(sql, [nickName]);
        console.log(rows[0].games);
        let user = rows[0];
        return user;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getSingleUser = getSingleUser;
// upload a new image to a user
const uploadUserImage = (image, user) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = "UPDATE users SET userImageUrl = ? WHERE nickName = ?";
    try {
        let [result] = yield db.execute(sql, [image, user]);
        return {
            success: result.affectedRows === 1,
            message: result.affectedRows === 1
                ? "User photo changed"
                : "Failed to change user image",
        };
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.uploadUserImage = uploadUserImage;
