"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomModel = new mongoose_1.Schema({
    users: [
        {
            type: String,
            required: true,
        },
    ],
}, { collection: "Rooms" });
exports.default = (0, mongoose_1.model)("Room", RoomModel);
