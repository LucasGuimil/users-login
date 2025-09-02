import mongoose from "mongoose";
import MongoStore from "connect-mongo"
import dotenv from "dotenv"
dotenv.config()

export const dbConnection = async()=> {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URI)
        console.log("Database connected succesfully!")
    } catch (error) {
        console.error("Unnable to connect database"); 
    }
}

export const sessionStore = MongoStore.create({
        mongoUrl: process.env.MONGO_ATLAS_URI,
        ttl: 60 * 60,
    })