"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class AuthController {
    auth(_, res) {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT}`);
    }
    login(req, res) {
        const body = {
            client_id: process.env.GITHUB_CLIENT,
            client_secret: process.env.GITHUB_SECRET,
            code: req.query.code,
        };
        const opts = { headers: { accept: "application/json" } };
        axios_1.default
            .post("https://github.com/login/oauth/access_token", body, opts)
            .then((res) => res.data.access_token)
            .then((token) => {
            res.redirect(`${process.env.BASE_URL}/?token=${token}`);
        })
            .catch((err) => res.status(500).json({ error: err.message }));
    }
}
exports.default = new AuthController();
