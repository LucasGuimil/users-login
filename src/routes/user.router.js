import { Router } from "express"
import userModel from "../config/models/user.model.js"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import { alreadyLogged, requiredLogin } from "../middleware/auth.middleware.js"

const userRouter = Router()

//Get all users
userRouter.get("/",requiredLogin, async (req, res) => {
    try {
        const users = await userModel.find()
        res.send({
            payload: users
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

//Create new user
userRouter.post("/new", alreadyLogged ,async (req, res) => {
    const { first_name, last_name, age, password, cart, email, role } = req.body
    if (!first_name || !last_name || !age || !password || !cart || !email) {
        res.status(400).json({ error: "All the information is required" })
    }
    const exists = await userModel.findOne({ email })
    if (exists) return res.status(400).json({ error: "Email already registered" })
    try {
        const hash = bcrypt.hashSync(password, 10)
        await userModel.create({ first_name, last_name, email, age, password: hash, cart, role })
        res.status(201).json({
            message: "New user created successfully",
            payload: {
                first_name,
                last_name,
                email,
                age,
                role
            }
        })
    } catch (error) {
        res.status(500).json({ error: "User couldn't be created." })
    }
})

//Update user
userRouter.put("/:uid", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.uid)) {
            return res.status(400).json({ error: "The ID is invalid." })
        }
        const u = await userModel.findByIdAndUpdate(req.params.uid, req.body)
        if (!u) return res.status(400).json({ error: "User not found." })
        res.json({
            message: "User information updated successfully!",
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Delete user
userRouter.delete("/:uid", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.uid)) {
            return res.status(400).json({ error: "The ID is invalid." })
        }
        const u = await userModel.findByIdAndDelete(req.params.uid)
        if (!u) return res.status(400).json({ error: "User not found." })
        res.json({
            message: "User deleted from database!",
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


export default userRouter
