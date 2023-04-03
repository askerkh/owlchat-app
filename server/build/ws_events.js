"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events = {
    CONNECT: "connection",
    SERVER: {
        AUTH: "auth",
        CREATE_ROOM: "create-room",
        JOIN_ROOM: "join-room",
        SEND_MESSAGE: "send-message",
        DELETE_ROOM: "delete-room",
    },
    CLIENT: {
        SET_ROOM_ID: "set-room-id",
        MESSAGE: "message",
        GET_ALL_ROOMS: "get-all-rooms",
    },
};
exports.default = Events;
