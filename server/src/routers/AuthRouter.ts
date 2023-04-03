import { Router } from "express"
import AuthController from "../controllers/AuthController"

const AuthRouter = Router()

AuthRouter.get("/", AuthController.login)
AuthRouter.get("/auth", AuthController.auth)

export default AuthRouter
