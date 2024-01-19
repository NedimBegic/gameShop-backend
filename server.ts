import express from "express";
import * as dotenv from "dotenv";
import errorHandler from "./middleware/error";
import multer from "multer";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";

// router
import games from "./routes/games";
import auth from "./routes/auth";

// Configuration
dotenv.config();
const app = express();

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Body Parsers
app.use(upload.single("file"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Routes
app.use("/games", games);
app.use("/auth", auth);

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
