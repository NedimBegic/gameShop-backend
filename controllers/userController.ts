import { Request, Response } from "express";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";

// Route: /login,
// METHOD: POST,
// DESC: login a user and store to database
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { nickName, email, pass, confirmPass } = req.body;
    // Verify the email ???????????
    if (pass != confirmPass) {
      return next(new ErrorResponse("The passwords don't match", 404));
    }
    res.json({ success: true, data: { nickName, email } });
  }
);
