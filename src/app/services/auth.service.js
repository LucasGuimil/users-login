import bcrypt from "bcrypt"
import { userService } from "./user.service.js"
import jwt from "jsonwebtoken"
import { toShowInfoDTO, toUpdateMeDTO } from "../dto/current.dto.js"

class AuthService {
    async validate(email, password) {
        if (!email || !password) return
        const u = await userService.getByEmail({ email: email })
        const p = bcrypt.compareSync(password, u.password)
        if (!u || !p) return
        return u
    }
    async login(req, u) {
        const payload = { sub: String(u._id), email: u.email, role: u.role }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
        return token
    }
    async logout(req) {
        return new Promise((resolve,reject)=>{
            req.logOut( { keepSessionInfo: true }, (error) => {
            if (error) return reject(error)
            if (req.session) {
                req.session.destroy((error2) => {
                    if (error2) return reject(error2)
                    resolve()
                })
            }
            resolve()
        })})
    }
    async current(user,param){
        const dto = toShowInfoDTO(user,param)
        if (!dto) return
        return dto 
    }
    async update(id, data){
        const dto = toUpdateMeDTO(data)
        const u = await userService.updateById(id,dto)
        if (!u || !dto) return
        return u 
    }
}

export const authService = new AuthService()