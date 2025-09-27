import { Router } from "express";
import { requireAdmin, requiredLogin } from "../middleware/auth.middleware.js";
import { productsController } from "../app/controllers/products.controller.js";


const productsRouter = Router()
productsRouter.use(requiredLogin)

productsRouter.get("/", (req, res) => { productsController.getAll(req, res) })
productsRouter.post("/", requireAdmin, (req, res) => { productsController.newProduct(req, res) })

export default productsRouter