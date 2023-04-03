"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const AuthRouter_1 = __importDefault(require("./routers/AuthRouter"));
const websocket_1 = require("./websocket");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// app.get("/", (_, res) => {
// if (req.query.token) {
//   axios
//     .get("https://api.github.com/user", {
//       headers: {
//         Authorization: `Bearer ${req.query.token}`,
//       },
//     })
//     .then((res) => res.data)
//     .then((data) => {
//       if (data.id) {
//         res.sendFile(path.resolve(__dirname, "../static/auth.html"))
//       } else {
//         res.send("<h1>You are unauthtorized</h1>")
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err.message })
//     })
// } else {
//   res.sendFile(path.resolve(__dirname, "../static/index.html"))
// }
// })
app.use("/login", AuthRouter_1.default);
new websocket_1.ChatWS(server);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@chatrooms.lqumwez.mongodb.net/Chat?retryWrites=true&w=majority`);
        server.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));
    }
    catch (error) {
        if (error instanceof Error)
            console.log(error.message);
    }
});
start();
