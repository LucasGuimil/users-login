import {Router} from "express"
import userModel from "../config/models/user.model.js"
import bcrypt from "bcrypt"

const userRouter = Router()

//Get all users
userRouter.get("/", async (req, res)=> {
    try {
        const users = await userModel.find()
        return res.send({
            payload: users
        })
    } catch (error) {
        return res.status(500).send({error: error})
    }
})

//Create new user
userRouter.post("/", async(req, res)=> {
    const {first_name, last_name, age, password, cart, email, role} = req.body
    if(!first_name || !last_name || !age || !password || !cart || !email) {
        return res.status(400).json({error: "All the information is required"})
    }
    try {
        const exists = await userModel.findOne({email})
        if(exists) return res.status(400).json({error: "Email already registered"})
        const hash = bcrypt.hashSync(password)
        
        
    } catch (error) {
        
    }
})


export default userRouter
