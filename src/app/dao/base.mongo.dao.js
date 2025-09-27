export class BaseDAO {
    constructor(model) { this.model = model }

    async create(data) { return await this.model.create(data) }
    async getById(id) { return await this.model.findById(id) }
    async getOne(filter = {}) { return await this.model.findOne(filter) }
    async getAll(filter = {}, options = {}) {
        const query = this.model.find(filter)
        if (options.sort) query.sort(options.sort)
        if (options.limit) query.sort(options.limit)
        if (options.skip) query.sort(options.skip)
        if (options.select) query.sort(options.select)
        return await query
    }
    async updateById(id, data) {return await this.model.findByIdAndUpdate(id,data, {new: true , runValidators: true})}
    async deleteById(id) { return await this.model.findByIdAndDelete(id)}
    async count(filter ={}) {return await this.model.countDocuments(filter)}
} 