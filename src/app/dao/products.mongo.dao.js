import { BaseDAO } from "./base.mongo.dao.js";
import productModel from "../../config/models/product.model.js";

export class ProductsMongoDAO extends BaseDAO {
    constructor(){super(productModel)}
    
}
