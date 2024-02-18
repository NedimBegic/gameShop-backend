import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/error.js";
import multer from "multer";
import cookieParser from "cookie-parser";
import cors from "cors";
// router
import games from "./routes/games.js";
import auth from "./routes/auth.js";
import user from "./routes/user.js";

// Configuration
dotenv.config();
const app = express();

// configure cors
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

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
app.use("/user", user);

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
