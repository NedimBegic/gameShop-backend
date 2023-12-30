import express, { Request, Response } from "express";
const router = express.Router();
const db = require("../model/db");

router.get("/games", (req: Request, res: Response) => {
  db.execute("SELECT * FROM games")
    .then((result: [][]) => {
      res.json(result[0]);
      console.log(result[0]);
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

export default router;
