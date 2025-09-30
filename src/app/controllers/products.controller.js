import mongoose from "mongoose";
import { toCreateProductDTO, toUpdateProductDTO } from "../dto/product.dto.js";
import { productsService as svc } from "../services/products.service.js";

class ProductsController {
    async getAll(req, res) {
        try {
            const {limit,skip, sort,status,category} = req.query
            const filter ={}
            const options = {}
            if(category) filter.category = category
            if(status) filter.status = status
            if(limit) options.limit = limit
            if(skip) options.skip = skip
            if(sort) options.sort = {price:sort}
            const products = await svc.getAll(filter,options)
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
            const p = await svc.get(req.params.pid)
            if(!p) return res.status(404).json({message: "Product not found"})
            res.json({p})
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req, res) {
        try {
            const p = await svc.delete(req.params.pid)
            if(!p) return res.status(404).json({message: "Product not found"})
            res.status(204).json()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req, res) {
        try {
            if(!req.body) return res.status(400).json({message: "Nothing to update."})
            const dto = toUpdateProductDTO(req.body)
            const p = await svc.update(req.params.pid,dto)
            if(!p) return res.status(404).json({message: "Product not found"})
            res.status(200).json({message: "Product updated", payload: p})
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export const productsController = new ProductsController()
