import express from "express";
import * as dotenv from "dotenv";
import games from "./routes/games";
import errorHandler = require("./middleware/error");
const db = require("./model/db");

// Configuration
dotenv.config();
const app = express();
app.use(express.json());

// routes
app.use(games);

// middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running");
});
