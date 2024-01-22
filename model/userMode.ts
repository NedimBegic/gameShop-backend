const db = require("../model/db");
import { User } from "../utils/types";

// search for a user in database
export const getSingleUser = async (
  nickName: string
): Promise<User | undefined> => {
  let sql = "SELECT * FROM users WHERE nickName = ?";
  try {
    let [rows] = await db.execute(sql, [nickName]);
    console.log(rows[0].games);
    let user: User = rows[0];
    return user;
  } catch (err) {
    console.log(err);
  }
};

// upload a new image to a user
export const uploadUserImage = async (
  image: string,
  user: string
): Promise<{ success: boolean; message: string }> => {
  let sql = "UPDATE users SET userImageUrl = ? WHERE nickName = ?";
  try {
    let [result] = await db.execute(sql, [image, user]);
    return {
      success: result.affectedRows === 1,
      message:
        result.affectedRows === 1
          ? "User photo changed"
          : "Failed to change user image",
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
