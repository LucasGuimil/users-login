import userModel from "../../config/models/user.model.js";
import { BaseDAO } from "./base.mongo.dao.js";

export class UserMongoDao extends BaseDAO {
    constructor(){super(userModel)}
}