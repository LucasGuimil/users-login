
import { authService } from "../services/auth.service.js";

class AuthController {
    async logIn(req, res) {
        try {
            const u = await authService.validate(req.body.email, req.body.password)
            if (!u) { return res.status(400).send("Invalid credentials") }
            const token = await authService.login(req,u)
            if(!token) {return res.status(500).json({error: "Token error"})}
            req.session.user = u
            req.session.user.token = token
            res.json({ message: "Login succesfull (JWT)", token })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
    async logOut(req,res){
        try {
            await authService.logout(req)
            res.clearCookie("connect.sid")
            return res.status(200).send("Logged out succesfully!")
        } catch (error) {
            res.status(500).json({ error })
        }
    }
    async current(req,res){
        try {
            const u = await authService.current(req.user,req.path)
            return res.status(200).send(u)
        } catch (error) {
            res.status(500).json({error})
        }
    }
    async update(req,res){
        try {
            const u = await authService.update(req.session.user._id,req.body)
            if(!u) return res.status(400).json({message: "Unable to update user information."} )
            req.session.user = u
            return res.status(200).send("Your information has been updated!")
        } catch (error) {
            res.status(500).json({error})
        }
    }
}

export const authController = new AuthController()