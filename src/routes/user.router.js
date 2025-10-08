import { Router } from "express"
import { alreadyLogged, requiredRole } from "../middleware/auth.middleware.js"
import { userController } from "../app/controllers/user.controller.js"
import { validateId } from "../middleware/helper.middleware.js";

const userRouter = Router()


userRouter.get("/",requiredRole("admin"),(req,res)=>{userController.get(req,res)})
userRouter.post("/",alreadyLogged,(req,res)=>{userController.create(req,res)})
userRouter.put("/:uid",validateId,requiredRole("admin"),(req,res)=>{userController.update(req,res)})
userRouter.delete("/:uid",validateId,requiredRole("admin"),(req,res)=>{userController.delete(req,res)})
userRouter.get("/:uid",validateId,requiredRole("admin"),(req,res)=>{userController.getByID(req,res)})

export default userRouter
