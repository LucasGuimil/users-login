import ticketModel from "../../config/models/ticket.model";
import { BaseDAO } from "./base.mongo.dao";

export class TicketMongoDAO extends BaseDAO {
    constructor() { super(ticketModel) }
}