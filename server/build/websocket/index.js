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
exports.ChatWS = void 0;
const socket_io_1 = require("socket.io");
const getGithubId_1 = __importDefault(require("../services/getGithubId"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const uuid_1 = require("uuid");
const ws_events_1 = __importDefault(require("../ws_events"));
const axios_1 = __importDefault(require("axios"));
class ChatWS {
    constructor(server) {
        this.StartListeners = (socket) => {
            socket.on(ws_events_1.default.SERVER.AUTH, (token) => __awaiter(this, void 0, void 0, function* () {
                const gh_id = yield (0, getGithubId_1.default)(token);
                if (gh_id === -1)
                    return;
                let User = yield UserModel_1.default.findOne({ gh_id });
                if (User == null) {
                    User = new UserModel_1.default({ gh_id, rooms: [] });
                    yield User.save();
                }
                socket.emit(ws_events_1.default.CLIENT.GET_ALL_ROOMS, User.rooms);
            }));
            socket.on(ws_events_1.default.SERVER.CREATE_ROOM, (token, users) => __awaiter(this, void 0, void 0, function* () {
                const gh_id = yield (0, getGithubId_1.default)(token);
                if (gh_id === -1 || users.length <= 0)
                    return;
                const User = yield UserModel_1.default.findOne({ gh_id });
                if (User != null) {
                    const roomId = (0, uuid_1.v4)();
                    if (!User.rooms.includes(roomId)) {
                        User.rooms.push(roomId);
                    }
                    socket.join(roomId);
                    socket.emit(ws_events_1.default.CLIENT.SET_ROOM_ID, roomId);
                    socket.emit(ws_events_1.default.CLIENT.GET_ALL_ROOMS, User.rooms);
                    User.save();
                    users.forEach((inpUser) => __awaiter(this, void 0, void 0, function* () {
                        if (!(inpUser === null || inpUser === void 0 ? void 0 : inpUser.id))
                            return;
                        const gitId = yield axios_1.default
                            .get(`https://api.github.com/users/${inpUser.username.toLowerCase()}`)
                            .then((res) => { var _a; return (_a = res.data) === null || _a === void 0 ? void 0 : _a.id; })
                            .catch((e) => console.log(e.message));
                        if (!gitId)
                            return;
                        const user = yield UserModel_1.default.findOne({ gh_id: gitId });
                        if (user && !user.rooms.includes(roomId)) {
                            user.rooms.push(roomId);
                            yield user.save();
                        }
                        else if (!user) {
                            const newUser = new UserModel_1.default({ gh_id: gitId, rooms: [] });
                            newUser.rooms.push(roomId);
                            newUser.save();
                        }
                    }));
                }
            }));
            socket.on(ws_events_1.default.SERVER.DELETE_ROOM, (token, roomId) => __awaiter(this, void 0, void 0, function* () {
                const gh_id = yield (0, getGithubId_1.default)(token);
                if (gh_id === -1)
                    return;
                const Users = yield UserModel_1.default.find({ rooms: { $all: [roomId] } });
                for (const user of Users) {
                    user.rooms = user.rooms.filter((room) => room != roomId);
                    user.save();
                }
                const User = yield UserModel_1.default.findOne({ gh_id });
                if (User) {
                    socket.emit(ws_events_1.default.CLIENT.GET_ALL_ROOMS, User.rooms.filter((room) => room != roomId));
                }
                socket.emit(ws_events_1.default.CLIENT.SET_ROOM_ID, null);
                this.io.in(roomId).socketsLeave(roomId);
            }));
            socket.on(ws_events_1.default.SERVER.JOIN_ROOM, (token, roomId) => __awaiter(this, void 0, void 0, function* () {
                const gh_id = yield (0, getGithubId_1.default)(token);
                if (gh_id === -1)
                    return;
                const User = yield UserModel_1.default.findOne({ gh_id });
                if (User != null &&
                    User.rooms &&
                    User.rooms.find((room) => room == roomId)) {
                    socket.join(roomId);
                    socket.emit(ws_events_1.default.CLIENT.SET_ROOM_ID, roomId);
                }
            }));
            socket.on(ws_events_1.default.SERVER.SEND_MESSAGE, (message, token, roomId) => __awaiter(this, void 0, void 0, function* () {
                const user = yield axios_1.default
                    .get("https://api.github.com/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.data)
                    .catch((err) => console.log(err.message));
                if (!(user === null || user === void 0 ? void 0 : user.id))
                    return;
                const User = yield UserModel_1.default.findOne({ gh_id: user.id });
                if (User != null && User.rooms.find((room) => room == roomId)) {
                    this.io.to(roomId).emit(ws_events_1.default.CLIENT.MESSAGE, message, {
                        username: user.login,
                        avatar: user.avatar_url,
                    }, roomId);
                }
            }));
        };
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: "*",
            },
        });
        this.io.on(ws_events_1.default.CONNECT, this.StartListeners);
    }
}
exports.ChatWS = ChatWS;
