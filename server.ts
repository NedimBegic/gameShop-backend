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
app.post("/upload", async (req, res) => {
  try {
    const uploadedFile = req.file?.buffer;
    const base64Data = uploadedFile?.toString("base64");
    /*     const imgUrl = await uploadToImgur(base64Data);
    console.log(imgUrl);
    res.json({ imgUrl }); */
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
