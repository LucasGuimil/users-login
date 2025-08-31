import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.router.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
dotenv.config()


const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_ATLAS_URI)
    .then(console.log("Database connected succesfully!"))
    .catch(error => console.error(error))

app.use("/users", userRouter)

app.listen(PORT,console.log(`Listening on port ${PORT}.`))