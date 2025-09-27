import { toCreateProductDTO } from "../dto/product.dto.js";
import { productsService as svc } from "../services/products.service.js";

class ProductsController{
        async getAll(req,res){
            try {
                const products = await svc.getAll()
                return res.status(200).json({products})
            } catch (error) {
                res.status(500).send(error)
            }
        }
        async newProduct(req,res){
            try {
                const dto = toCreateProductDTO(req.body)
                if(!dto) return res.status(400).send("Invalid or missing information")
                const newProduct = await svc.create(dto)
                res.status(201).send("New product created succesfully!",newProduct)
            } catch (error) {
                res.status(500).send(error)
            }
        }
}

export const productsController = new ProductsController()
