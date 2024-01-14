import { Request, Response } from "express";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { RegisteringUser, User } from "../utils/types";
import uploadToImgur from "../model/imgur";
import { hashPassword } from "../utils/encrypt";
import { isNickNameTaken, isEmailTaken, saveNewUser } from "../model/auth";

// ROUTE: /register,
// METHOD POST,
// DESC: register an account
export const registerController = asyncHandler(
  async (req: Request, res: Response, next) => {
    /* Entered data from user */
    const { nickName, email, password, confirmPassword } = req.body;
    const registerData: RegisteringUser = {
      nickName,
      email,
      password,
      confirmPassword,
    };
    const fileImage: Express.Multer.File | undefined = req.file;
    // Verify the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      return next(new ErrorResponse("Invalid email format", 400));
    }
    // Verify password match
    if (registerData.password != registerData.confirmPassword) {
      return next(new ErrorResponse("The passwords don't match", 404));
    }
    // Check if the user nickName already exists
    let nickNameTaken = await isNickNameTaken(nickName);
    if (nickNameTaken) {
      return next(new ErrorResponse("Nickname already taken.", 404));
    }
    // Check if the user email already exist
    let emailTaken = await isEmailTaken(email);
    if (emailTaken) {
      return next(new ErrorResponse("Email already exist", 404));
    }
    // for storing user image
    let userImageUrl: string;
    if (fileImage) {
      const base64Data = fileImage?.buffer.toString("base64");
      userImageUrl = await uploadToImgur(base64Data);
    } else {
      userImageUrl = "";
    }
    // hash Password
    const hashedPassword = await hashPassword(password);
    const newUser: User = {
      ...registerData,
      password: hashedPassword,
      userImageUrl,
    };
    const saveUser = await saveNewUser(newUser);
    // check if user is saved
    if (!saveUser.success) {
      return next(new ErrorResponse(saveUser.message, 404));
    }
    res.json({ success: true, message: "User succesfully saved in database" });
  }
);
// Route: /login,
// METHOD: POST,
// DESC: login a user and store to database
export const loginController = asyncHandler(
  async (req: Request, res: Response, next) => {}
);
