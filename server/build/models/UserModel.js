"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    gh_id: {
        type: String,
        required: true,
        unique: true,
    },
    rooms: [{ type: String }],
}, { collection: "Users" });
exports.default = (0, mongoose_1.model)("User", UserSchema);
