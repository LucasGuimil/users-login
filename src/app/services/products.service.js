import { ProductsRepository } from "../repository/products.repository.js";


class ProductsService{
    constructor(repository = new ProductsRepository){
        this.repository = repository
    }
    async getAll(filter,options){return await this.repository.getAll(filter,options)}
    async get(id) { return await this.repository.getById(id)}
    async create(data) { return await this.repository.create(data)}
    async delete(id) { return await this.repository.deleteById(id)}
    async update(id,data) { return await this.repository.updateById(id,data)}

}

export const productsService = new ProductsService()