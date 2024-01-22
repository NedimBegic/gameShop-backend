import { Request, Response } from "express";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { getSingleUser, uploadUserImage } from "../model/userMode";
import { User, Game, CustomRequest } from "../utils/types";
import { getUsersGames } from "../model/gamesModel";
import uploadToImgur = require("../model/imgur");

// ROUTE: /:nickName;
// METHOD: GET;
// DESC: get single user
export const getUserController = asyncHandler(
  async (req: Request, res: Response, next) => {
    let name = req.params.nickName;
    let user: User | undefined = await getSingleUser(name);
    if (!user) {
      return next(
        new ErrorResponse("There is no user with that nickname", 404)
      );
    }
    let games: Game[] | undefined = await getUsersGames(user.user_id as number);
    res.status(200).json({
      success: true,
      data: {
        nickName: user.nickName,
        email: user.email,
        userImageUrl: user.userImageUrl,
        games: games || [],
      },
    });
  }
);

// ROUTE: /:nickName,
// METHID: PUT,
// DESC: change user image
export const changeUserImageController = asyncHandler(
  async (req: CustomRequest, res: Response, next) => {
    let fileData: Express.Multer.File | undefined = req.file;
    if (!fileData) {
      return next(new ErrorResponse("There is no uploaded image", 404));
    }
    const base64Data = fileData?.buffer.toString("base64");
    const newImage = await uploadToImgur(base64Data as string);
    let nickName: string = req.user.nickName;
    let result: { success: boolean; message: string } = await uploadUserImage(
      newImage,
      nickName
    );
    if (!result.success) {
      return res.json({
        success: false,
        message: result.message || "Some default error message",
      });
    }
    return res.json({
      success: true,
      message: "User image succesfully uploaded!",
    });
  }
);
