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
