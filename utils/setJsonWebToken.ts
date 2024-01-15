import Jwt, { Secret } from "jsonwebtoken";
import { User } from "./types";
import dotenv from "dotenv";
dotenv.config();

const makeJwt = (userData: User): string | undefined => {
  const options = { expiresIn: "30d" };

  // Check if JWT_SECRET is defined
  const secret = process.env.JWT_SECRET as Secret | undefined;
  if (!secret) {
    console.error("JWT_SECRET is not defined");
    return undefined; // or throw an error, depending on your error handling strategy
  }

  const token = Jwt.sign(userData, secret, options);
  return token;
};

export default makeJwt;
