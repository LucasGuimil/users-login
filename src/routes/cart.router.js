import { Router } from "express";
import { cartController } from "../app/controllers/cart.controller.js";
import { requiredRole } from "../middleware/auth.middleware.js";
import { validateId } from "../middleware/helper.middleware.js";

const cartsRouter = Router()
cartsRouter.use(requiredRole("user"))

cartsRouter.post("/", (req,res)=> {cartController.create(req,res)})
cartsRouter.get("/:cid", validateId, (req,res)=>{ cartController.get(req,res)})
cartsRouter.post("/:cid/products/:pid", validateId, (req,res)=>{cartController.add(req,res)})
cartsRouter.put("/:cid",validateId,(req,res)=>{cartController.replace(req,res)})
cartsRouter.put("/:cid/products/:pid",validateId,(req,res)=>{cartController.modifyQuantity(req,res)})
cartsRouter.delete("/:cid/products/:pid",validateId,(req,res)=>{cartController.deleteOne(req,res)})
cartsRouter.delete("/:cid",validateId,(req,res)=>{cartController.delete(req,res)})

export default cartsRouter