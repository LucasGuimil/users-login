import { CartRepository } from "../repository/cart.repository.js";

class CartService {
    constructor(repository = new CartRepository){
        this.repository = repository
    }
    async create(data) { return await this.repository.create(data) }
    async getById(id) { return await this.repository.getById(id) }
    async get(id) { return await this.repository.get(id) }
    async updateById(id, data) { return await this.repository.updateById(id, data) }
    async deleteById(id) { return await this.repository.deleteById(id) }
    async getByCode(code) { return await this.repository.getByCode(code)}
}

export const cartService = new CartService()