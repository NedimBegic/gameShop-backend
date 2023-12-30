import express from "express";
import * as dotenv from "dotenv";
import products from "./routes/products";
const db = require("./model/db");
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
db.execute("SELECT * FROM games")
  .then((result: [][]) => {
    console.log(result[0]);
  })
  .catch((err: Error) => {
    console.log(err);
  });

// Configuration
dotenv.config();
const app = express();
app.use(express.json());

// routes
app.use(products);

app.listen(3000, () => {
  console.log("Server is running");
});
