import { Router } from "express";
import { requiredRole } from "../middleware/auth.middleware.js";
import { productsController } from "../app/controllers/products.controller.js";
import { validateId } from "../middleware/helper.middleware.js";

const productsRouter = Router()

productsRouter.get("/", requiredRole("user","admin"), (req, res) => { productsController.getAll(req, res) })
productsRouter.post("/", requiredRole("admin"), (req, res) => { productsController.newProduct(req, res) })
productsRouter.get("/:pid",requiredRole("user","admin"),validateId,(req,res)=>{productsController.getById(req,res)})
productsRouter.delete("/:pid",requiredRole("admin"),validateId,(req,res)=>{productsController.delete(req,res)})
productsRouter.put("/:pid",requiredRole("admin"),validateId,(req,res)=>{productsController.update(req,res)})

export default productsRouter