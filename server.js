"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_js_1 = __importDefault(require("./middleware/error.js"));
const multer_1 = __importDefault(require("multer"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// router
const games_js_1 = __importDefault(require("./routes/games.js"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const user_js_1 = __importDefault(require("./routes/user.js"));
// Configuration
dotenv_1.default.config();
const app = (0, express_1.default)();
// configure cors
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
// Multer configuration
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// Body Parsers
app.use(upload.single("file"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Cookie Parser
app.use((0, cookie_parser_1.default)());
// Routes
app.use("/games", games_js_1.default);
app.use("/auth", auth_js_1.default);
app.use("/user", user_js_1.default);
// Error Handler
app.use(error_js_1.default);
app.listen(process.env.PORT, () => {
    console.log("Server is running");
});
