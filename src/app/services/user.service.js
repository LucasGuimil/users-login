import { UsersRepository } from "../repository/user.repository.js";

class UserService{
    constructor(repository = new UsersRepository){
        this.repository = repository
    }
    async getAll(filter,options){return await this.repository.getAll(filter,options)}
    async create(data) { return await this.repository.create(data) }
    async getById(id) { return await this.repository.getById(id) }
    async updateById(id, data) { return await this.repository.updateById(id, data) }
    async deleteById(id) { return await this.repository.deleteById(id) }
    async getByEmail(email) { return await this.repository.getOne(email)}
}

export const userService = new UserService()