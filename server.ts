import express from "express";
import * as dotenv from "dotenv";
import games from "./routes/games";
import errorHandler = require("./middleware/error");
import multer from "multer";

// Configuration
dotenv.config();
const app = express();
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(upload.single("file"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/games", games);

// middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
