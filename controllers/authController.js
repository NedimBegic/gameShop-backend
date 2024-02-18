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
exports.loginController = exports.registerController = void 0;
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const imgur_1 = __importDefault(require("../model/imgur"));
const encrypt_1 = require("../utils/encrypt");
const auth_1 = require("../model/auth");
const setJsonWebToken_1 = __importDefault(require("../utils/setJsonWebToken"));
// ROUTE: /register,
// METHOD POST,
// DESC: register an account
exports.registerController = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* Entered data from user */
    const { nickName, email, password, confirmPassword } = req.body;
    const registerData = {
        nickName,
        email,
        password,
        confirmPassword,
    };
    const fileImage = req.file;
    // Verify the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
        return next(new errorResponse_1.default("Invalid email format", 400));
    }
    // Verify password match
    if (registerData.password != registerData.confirmPassword) {
        return next(new errorResponse_1.default("The passwords don't match", 404));
    }
    // Check if the user nickName already exists
    let nickNameTaken = yield (0, auth_1.isNickNameTaken)(nickName);
    if (nickNameTaken) {
        return next(new errorResponse_1.default("Nickname already taken.", 404));
    }
    // Check if the user email already exist
    let emailTaken = yield (0, auth_1.isEmailTaken)(email);
    if (emailTaken) {
        return next(new errorResponse_1.default("Email already exist", 404));
    }
    // for storing user image
    let userImageUrl;
    if (fileImage) {
        const base64Data = fileImage === null || fileImage === void 0 ? void 0 : fileImage.buffer.toString("base64");
        userImageUrl = yield (0, imgur_1.default)(base64Data);
    }
    else {
        userImageUrl = "";
    }
    // hash Password
    const hashedPassword = yield (0, encrypt_1.hashPassword)(password);
    const newUser = Object.assign(Object.assign({}, registerData), { password: hashedPassword, userImageUrl });
    const saveUser = yield (0, auth_1.saveNewUser)(newUser);
    // check if user is saved
    if (!saveUser.success) {
        return next(new errorResponse_1.default(saveUser.message, 404));
    }
    // make token for user
    const token = (0, setJsonWebToken_1.default)(newUser);
    res
        .cookie("token", token, {
        httpOnly: true,
    })
        .json({
        success: true,
        data: {
            nickName: newUser.nickName,
            email: newUser.email,
            userImageUrl: newUser.userImageUrl,
        },
        token: token,
    });
}));
// Route: /login,
// METHOD: POST,
// DESC: login a user and store to database
exports.loginController = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Verify the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new errorResponse_1.default("Invalid email format", 400));
    }
    // search for user in database
    const userData = yield (0, auth_1.getLogingUser)(email);
    // there is no user
    if (userData === null) {
        return next(new errorResponse_1.default("There is no user with that email", 404));
    }
    // password match
    const passMatch = yield (0, encrypt_1.comparePasswords)(password, userData.password);
    if (!passMatch) {
        return next(new errorResponse_1.default("Password is incorect!", 404));
    }
    // make token for user
    const token = (0, setJsonWebToken_1.default)(userData);
    res
        .cookie("token", token, {
        httpOnly: true,
    })
        .json({
        success: true,
        data: {
            nickName: userData.nickName,
            email: userData.email,
            userImageUrl: userData.userImageUrl,
        },
        token: token,
    });
}));
