import { Server, Socket } from "socket.io"
import { Server as HttpServer } from "http"
import getGithubId from "../services/getGithubId"
import UserModel from "../models/UserModel"
import { v4 as idGen } from "uuid"
import Events from "../ws_events"
import axios from "axios"

interface User {
  avatar: string
  username: string
  id: number
}

export class ChatWS {
  public io: Server

  constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    })

    this.io.on(Events.CONNECT, this.StartListeners)
  }

  StartListeners = (socket: Socket) => {
    socket.on(Events.SERVER.AUTH, async (token) => {
      const gh_id = await getGithubId(token)

      if (gh_id === -1) return

      let User = await UserModel.findOne({ gh_id })

      if (User == null) {
        User = new UserModel({ gh_id, rooms: [] })
        await User.save()
      }

      socket.emit(Events.CLIENT.GET_ALL_ROOMS, User.rooms)
    })

    socket.on(
      Events.SERVER.CREATE_ROOM,
      async (token: string, users: User[]) => {
        const gh_id = await getGithubId(token)

        if (gh_id === -1 || users.length <= 0) return

        const User = await UserModel.findOne({ gh_id })

        if (User != null) {
          const roomId = idGen()

          if (!User.rooms.includes(roomId)) {
            User.rooms.push(roomId)
          }

          socket.join(roomId)
          socket.emit(Events.CLIENT.SET_ROOM_ID, roomId)
          socket.emit(Events.CLIENT.GET_ALL_ROOMS, User.rooms)

          User.save()

          users.forEach(async (inpUser) => {
            if (!inpUser?.id) return
            const gitId: string | undefined = await axios
              .get(
                `https://api.github.com/users/${inpUser.username.toLowerCase()}`,
              )
              .then((res) => res.data?.id)
              .catch((e) => console.log(e.message))
            if (!gitId) return

            const user = await UserModel.findOne({ gh_id: gitId })

            if (user && !user.rooms.includes(roomId)) {
              user.rooms.push(roomId)
              await user.save()
            } else if (!user) {
              const newUser = new UserModel({ gh_id: gitId, rooms: [] })
              newUser.rooms.push(roomId)
              newUser.save()
            }
          })
        }
      },
    )

    socket.on(
      Events.SERVER.DELETE_ROOM,
      async (token: string, roomId: string) => {
        const gh_id = await getGithubId(token)

        if (gh_id === -1) return

        const Users = await UserModel.find({ rooms: { $all: [roomId] } })

        for (const user of Users) {
          user.rooms = user.rooms.filter((room) => room != roomId)
          user.save()
        }

        const User = await UserModel.findOne({ gh_id })
        if (User) {
          socket.emit(
            Events.CLIENT.GET_ALL_ROOMS,
            User.rooms.filter((room) => room != roomId),
          )
        }

        socket.emit(Events.CLIENT.SET_ROOM_ID, null)
        this.io.in(roomId).socketsLeave(roomId)
      },
    )

    socket.on(
      Events.SERVER.JOIN_ROOM,
      async (token: string, roomId: string) => {
        const gh_id = await getGithubId(token)

        if (gh_id === -1) return

        const User = await UserModel.findOne({ gh_id })

        if (
          User != null &&
          User.rooms &&
          User.rooms.find((room) => room == roomId)
        ) {
          socket.join(roomId)
          socket.emit(Events.CLIENT.SET_ROOM_ID, roomId)
        }
      },
    )

    socket.on(
      Events.SERVER.SEND_MESSAGE,
      async (message: string, token: string, roomId: string) => {
        const user = await axios
          .get("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => res.data)
          .catch((err) => console.log(err.message))

        if (!user?.id) return

        const User = await UserModel.findOne({ gh_id: user.id })

        if (User != null && User.rooms.find((room) => room == roomId)) {
          this.io.to(roomId).emit(
            Events.CLIENT.MESSAGE,
            message,
            {
              username: user.login,
              avatar: user.avatar_url,
            },
            roomId,
          )
        }
      },
    )
  }
}
