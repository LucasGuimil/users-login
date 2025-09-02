import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import { dbConnection, sessionStore } from "./config/db/db.config.js"
import { initializePassport } from "./config/auth/passport.config.js"
import userRouter from "./routes/user.router.js"
import sessionsRouter from "./routes/sessions.router.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))


const PORT = process.env.PORT

const startServer = async () => {

    await dbConnection()
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
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
    app.use("/api/sessions", sessionsRouter)


    app.listen(PORT, console.log(`Listening on port ${PORT}.`))
}

await startServer()