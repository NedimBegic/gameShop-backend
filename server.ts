import express from "express";
import * as dotenv from "dotenv";
import games from "./routes/games";
const db = require("./model/db");

// Configuration
dotenv.config();
const app = express();
app.use(express.json());

// routes
app.use(games);

// start database
interface Game {
  // Define the structure of a game row
  id: number;
  name: string;
  description: string;
  release_date: Date;
  role: string;
  // ... other fields as needed
}

app.listen(3000, () => {
  console.log("Server is running");
});
