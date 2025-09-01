import mongoose from "mongoose";
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

