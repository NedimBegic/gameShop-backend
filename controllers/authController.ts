import { Request, Response } from "express";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { RegisteringUser, User } from "../utils/types";
import uploadToImgur from "../model/imgur";
import { hashPassword } from "../utils/encrypt";

// ROUTE: /register,
// METHOD POST,
// DESC: register an account
export const registerController = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { nickName, email, password, confirmPassword } = req.body;
    const registerData: RegisteringUser = {
      nickName,
      email,
      password,
      confirmPassword,
    };
    const fileImage: Express.Multer.File | undefined = req.file;
    // Verify the email ??????????? <-----------------------------------------|
    if (registerData.password != registerData.confirmPassword) {
      return next(new ErrorResponse("The passwords don't match", 404));
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
    res.json({ success: true, data: newUser });
  }
);
// Route: /login,
// METHOD: POST,
// DESC: login a user and store to database
export const loginController = asyncHandler(
  async (req: Request, res: Response, next) => {}
);
