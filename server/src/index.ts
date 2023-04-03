import express from "express"
import http from "http"
import dotenv from "dotenv"
import mongoose from "mongoose"
import AuthRouter from "./routers/AuthRouter"
import { ChatWS } from "./websocket"

dotenv.config()

const app = express()

const server = http.createServer(app)

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

app.use("/login", AuthRouter)

new ChatWS(server)

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@chatrooms.lqumwez.mongodb.net/Chat?retryWrites=true&w=majority`,
    )
    server.listen(process.env.PORT, () =>
      console.log(`Server started on ${process.env.PORT}`),
    )
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}

start()
