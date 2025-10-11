import { BaseDAO } from "./base.mongo.dao.js";
import cartModel from "../../config/models/cart.model.js";


export class CartsMongoDAO extends BaseDAO {
    constructor(){super(cartModel)}
    async getByCode(code) {return await this.model.findOne({ code })}
    async get(id) {return await this.model.findById(id).populate("products.productID")  }

}