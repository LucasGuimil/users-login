import { toCreateUserDTO, toUpdateUserDTO } from "../dto/user.dto.js";
import { userService } from "../services/user.service.js";

class UserController {

    async get(req, res) {
        try {
            const u = await userService.getAll()
            res.status(200).json({ users: u })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
    async create(req, res) {
        try {
            const dto = toCreateUserDTO(req.body)
            if (!dto) { return res.status(400).json({ error: "All the information is required" }) }
            const u = await userService.getByEmail({email: dto.email})
            if (u) {return res.status(400).json({ error: "Email already registered" })}
            await userService.create(dto)
            return res.status(201).json({ message: "User created" })
        } catch (error) {
            res.status(500).json({ error: "User couldn't be created." })
        }
    }
    async update(req, res) {
        try {
            const dto = toUpdateUserDTO(req.body)
            const u = await userService.updateById(req.params.uid, dto)
            if (!u) return res.status(400).json({ error: "User not found." })
            res.status(200).json({ message: "User information updated successfully!", })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async delete(req, res) {
        try {
            const u = await userModel.findByIdAndDelete(req.params.uid)
            if (!u) return res.status(404).json({ error: "User not found." })
            res.status(204).send()
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    async getByID(req,res){
        try {
            const u = await userService.getById(req.params.uid)
            if (!u) return res.status(404).json({ error: "User not found." })
            res.status(200).json({payload: u})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

export const userController = new UserController()