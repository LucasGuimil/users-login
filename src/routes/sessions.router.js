import { Router } from "express"
import passport from "passport"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { alreadyLogged, requiredLogin, requireJwt } from "../middleware/auth.middleware.js"
import userModel from "../config/models/user.model.js"
dotenv.config()



const sessionsRouter = Router()

//Local strategies
sessionsRouter.post("/login", alreadyLogged, async (req, res, next) => {
    try {
        passport.authenticate("local", (error, user, info) => {
            if (error) return next(error)
            if (!user) return res.status(400).json({ error: info?.message })

            req.logIn(user, { session: true }, (error2) => {
                if (error2) return next(error2)
                req.session.user = user
                return res.json({ message: "Logged in (local)" })
            })
        }
        )(req, res, next)
    }
    catch (error) {
        res.status(500).json({ error })
    }
})

sessionsRouter.post("/logout", requiredLogin, async (req, res, next) => {
    try {
        req.logOut({ keepSessionInfo: true }, (error) => {
            if (error) return next(error)
            if (req.session) {
                req.session.destroy((error2) => {
                    if (error2) return next(error2)
                    res.clearCookie("connect.sid")
                    return res.json({ message: "Logged out (local)" })

                })
            } else {
                res.clearCookie("connect.sid")
                return res.json({ message: "Logged out (local)" })
            }
        })
    } catch (error) {
        res.status(500).json({ error })
    }
})

sessionsRouter.get("/current", requiredLogin, requireJwt, async (req, res) => {
    try {
        if (req.user) return res.json({
            payload: {
                id: req.user._id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                role: req.user.role,
                token: req.token
            }
        })
    } catch (error) {
        res.status(500).json({ error })
    }
})

// JWT strategies
sessionsRouter.post("/jwt/login", alreadyLogged, async (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({ error: "All the information is required" })
    const u = await userModel.findOne({ email: req.body.email })
    if (!u) return res.status(404).json({ error: "User not found" })
    const p = bcrypt.compareSync(req.body.password, u.password)
    if (!p) return res.status(401).json({ error: "Invalid credentials" })
    try {
        const payload = { sub: String(u._id), email: u.email, role: u.role }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
        req.logIn(u, { session: true }, (error) => {
            if (error) return res.send(error)
            req.session.user = u
            res.json({ message: "Login succesfull (JWT)", token, payload })
        })
    } catch (error) {
        res.status(500).json({ error })
    }
})

sessionsRouter.get("/jwt/me", requiredLogin, requireJwt, async (req, res) => {
    try {
        res.json({
            payload: {
                id: req.user._id,
                first_name: req.user.first_name,
                role: req.user.role
            }
        })
    } catch (error) {
        res.status(500).json({ error })
    }
})

sessionsRouter.put("/jwt/me", requiredLogin, requireJwt, async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ error: "Missing information to update" })
        const u = await userModel.findByIdAndUpdate(req.session.user._id, req.body, { new: true, runValidators: true })
        if (!u) return res.status(400).json({ error: "User not found." })
        req.session.user = u
        res.json({ message: "Your information has been updated!" })
    } catch (error) {
        res.status(500).json({ error })
    }
})
export default sessionsRouter