import axios from "axios"
import { Request, Response } from "express"

interface queryReq {
  code: string
}

class AuthController {
  auth(_: Request, res: Response) {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT}`,
    )
  }

  login(req: Request<unknown, unknown, unknown, queryReq>, res: Response) {
    const body = {
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_SECRET,
      code: req.query.code,
    }

    const opts = { headers: { accept: "application/json" } }

    axios
      .post("https://github.com/login/oauth/access_token", body, opts)
      .then((res) => res.data.access_token)
      .then((token) => {
        res.redirect(`${process.env.BASE_URL}/?token=${token}`)
      })
      .catch((err) => res.status(500).json({ error: err.message }))
  }
}

export default new AuthController()
