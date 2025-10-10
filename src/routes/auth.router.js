import { Router } from "express"
import dotenv from "dotenv"
import { alreadyLogged, requiredRole, requireJwt } from "../middleware/auth.middleware.js"
import { authController } from "../app/controllers/auth.controller.js"
dotenv.config()

const authRouter = Router()

authRouter.post("/logout",requiredRole("admin","user"),(req,res)=>{ authController.logOut(req,res)})
authRouter.get("/current",requiredRole("user","admin"),requireJwt,(req,res)=> {authController.current(req,res)})
authRouter.post("/jwt/login",alreadyLogged,(req,res)=>{authController.logIn(req,res)})
authRouter.get("/me",requiredRole("user","admin"),requireJwt,(req,res)=>{authController.current(req,res)})
authRouter.put("/me",requiredRole("user","admin"),requireJwt,(req,res)=>{authController.update(req,res)})

export default authRouter