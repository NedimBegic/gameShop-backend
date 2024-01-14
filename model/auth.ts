const db = require("../model/db");
import { User } from "../utils/types";

/* +++ Save a new registred user to database */
const saveNewUser = async (userData: User): Promise<any> => {
  const { nickName, email, password, userImageUrl } = userData;
  let sql =
    "INSERT INTO users (nickName, email, password, userImageUrl) VALUES (?, ?, ?, ?)";
  try {
    const [rows] = await db.execute(sql, [
      nickName,
      email,
      password,
      userImageUrl,
    ]);
    return { success: true, data: rows };
  } catch (err) {
    console.log(err);
    return { success: false, msessage: err };
  }
};

/* +++ Get the loged in user */
const getLogingUser = async (email: string): Promise<User | null> => {
  let sql = "SELECT * FROM users WHERE email = ?";
  try {
    const [rows] = await db.execute(sql, [email]);
    if (rows.length > 0) {
      const userData: User = rows[0];
      return userData;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/* +++ Check if there is a user with that nickName */
const isNickNameTaken = async (nickName: string): Promise<boolean> => {
  try {
    let sql = "SELECT * FROM users WHERE nickName = ?";
    const [rows] = await db.execute(sql, [nickName]);
    // if the array is empty nickName is not taken
    return rows.length === 0 ? false : true;
  } catch (error) {
    console.error("Error checking nickname:", error);
    throw error; // Handle the error appropriately in your application
  }
};

/* +++ Check if there is a user with that email */
const isEmailTaken = async (email: string): Promise<boolean> => {
  try {
    let sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);
    // if the array is empty email is not taken
    return rows.length === 0 ? false : true;
  } catch (error) {
    console.error("Error checking email:", error);
    throw error; // Handle the error appropriately in your application
  }
};

export { isNickNameTaken, isEmailTaken, saveNewUser, getLogingUser };
