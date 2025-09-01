import express from "express"
import MongoStore from "connect-mongo"
import dotenv from "dotenv"
import userRouter from "./routes/user.router.js"
import { dbConnection } from "./config/db/db.config.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import { initializePassport } from "./config/auth/passport.config.js"
import authRouter from "./routes/auth.router.js"
import passport from "passport"

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))


const PORT = process.env.PORT

const startServer = async () => {

    await dbConnection()
    const sessionStore = MongoStore.create({
        mongoUrl: process.env.MONGO_ATLAS_URI,
        ttl: 60 * 60,
    })

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        sessionStore,
        cookie: {
            maxAge: 1 * 60 * 60 * 1000,
            httpOnly: true,
            /*             signed: true */
        }
    })
    )
    initializePassport()
    app.use(passport.initialize())
    app.use(passport.session())
    
    app.use("/api/users", userRouter)
    app.use("/api/auth", authRouter)


    app.listen(PORT, console.log(`Listening on port ${PORT}.`))
}

await startServer()