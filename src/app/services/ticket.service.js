import { TicketRepository } from "../repository/ticket.repository.js"

export class TicketService{
    constructor(repository = new TicketRepository){
        this.repository = repository
    }
    async create(data){return await this.repository.create(data)}
    async getById(id) { return await this.repository.getById(id) }
    async getByCode(filter) { return await this.repository.getOne(filter) }
}

export const ticketService = new TicketService()