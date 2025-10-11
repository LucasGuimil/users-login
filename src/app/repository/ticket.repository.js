import { TicketMongoDAO } from "../dao/ticket.mongo.dao.js";


export class TicketRepository{
    constructor(dao = new TicketMongoDAO){
        this.dao = dao
    }
    async create(data){return await this.dao.create(data)}
    async getById(id) { return await this.dao.getById(id) }
    async getOne(filter) { return await this.dao.getOne(filter) }
}