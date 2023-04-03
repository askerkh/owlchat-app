"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth = (header) => {
    const token = header.split(" ")[1];
    if (token === "abc") {
        return true;
    }
    else {
        return false;
    }
};
exports.default = (socket, next) => {
    const header = socket.handshake.headers["authorization"];
    if (header && typeof header == "string") {
        if (isAuth(header)) {
            return next();
        }
    }
    return next(new Error("authentication error"));
};
