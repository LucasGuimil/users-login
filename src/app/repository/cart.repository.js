import { CartsMongoDAO } from "../dao/carts.mongo.dao.js";

export class CartRepository{
    constructor(dao = new CartsMongoDAO){
        this.dao = dao
    }
    async create(data) { return await this.dao.create(data) }
    async getById(id) { return await this.dao.getById(id) }
    async get(id) { return await this.dao.get(id) }
    async updateById(id, data) { return await this.dao.updateById(id, data) }
    async deleteById(id) { return await this.dao.deleteById(id) }
    async getByCode(code) { return await this.dao.getByCode(code)}
}