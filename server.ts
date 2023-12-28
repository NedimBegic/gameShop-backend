import express from "express";
import * as dotenv from "dotenv";
import products from "./routes/products";
import { setupDatabase } from "./model/db";

// start database
const poop = setupDatabase();
// Configuration
dotenv.config();
const app = express();
app.use(express.json());

// routes
app.use(products);

app.listen(3000, () => {
  console.log("Server is running");
});
