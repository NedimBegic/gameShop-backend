import express from "express";
import * as dotenv from "dotenv";
import games from "./routes/games";
import errorHandler = require("./middleware/error");
const db = require("./model/db");
import multer from "multer";

// Configuration
dotenv.config();
const app = express();
// Multer configuration
const storage = multer.memoryStorage(); // Using memory storage for simplicity
const upload = multer({ storage: storage });
app.use(upload.single("file")); // Multer middleware for handling file uploads
app.use(express.urlencoded({ extended: true })); // Middleware for parsing text fields
app.use(express.json());

// routes
app.use("/games", games);

// middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running");
});
