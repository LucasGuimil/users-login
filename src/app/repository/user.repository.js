import { UserMongoDao } from "../dao/user.mongo.dao.js";

export class UsersRepository{
    constructor(dao = new UserMongoDao){
        this.dao = dao
    }
    async create(data) { return await this.dao.create(data) }
    async getById(id) { return await this.dao.getById(id) }
    async updateById(id, data) { return await this.dao.updateById(id, data) }
    async deleteById(id) { return await this.dao.deleteById(id) }
    async getOne(filter) { return await this.dao.getOne(filter)}
    async getAll(filter, options) { return await this.dao.getAll(filter, options) }
}