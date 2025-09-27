import mongoose from "mongoose";
import { toCreateProductDTO } from "../dto/product.dto.js";
import { productsService as svc } from "../services/products.service.js";

class ProductsController {
    async getAll(req, res) {
        try {
            console.log(req.query)
            const products = await svc.getAll(req.query)
            res.json({ products })
        } catch (error) {
            res.status(500).send(error)
        }
    }
    async newProduct(req, res) {
        try {
            const dto = toCreateProductDTO(req.body)
            if (!dto) return res.status(400).send("Invalid or missing information")
            const newProduct = await svc.create(dto)
            res.status(201).send("New product created succesfully!", newProduct)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async getById(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
                return res.status(400).json({ error: "The ID is invalid." })
            }
            const p = await svc.getById(req.params.id)
            if(!p) return res.status(404).json({message: "Product not found"})
            res.json({p})
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
                return res.status(400).json({ error: "The ID is invalid." })
            }
            const p = await svc.delete(req.params.id)
            if(!p) return res.status(404).json({message: "Product not found"})
            res.status(204)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
                return res.status(400).json({ error: "The ID is invalid." })
            }
            const dto = toCreateProductDTO(req.body)
            const p = await svc.update(req.params.id,dto)
            if(!p) return res.status(404).json({message: "Product not found"})
            res.status(200).json({message: "Product updated", payload: p})
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export const productsController = new ProductsController()
