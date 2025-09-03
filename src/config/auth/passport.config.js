import passport from "passport";
import bcrypt from "bcrypt"
import { configDotenv } from "dotenv";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../models/user.model.js";
configDotenv()

export function initializePassport(){
    passport.use("local", new LocalStrategy(
        {usernameField:"email",passwordField:"password",session: true}, async(email,password,done) => {
            try {
                const u = await userModel.findOne({email})
                if (!u || !u.password) return done(null,false,{message: "Invalid credentials"})
                const p = bcrypt.compareSync(password,u.password)
                if(!p) return done(null,false,{message: "Invalid credentials"})
                return done(null, {
                    _id: u._id,
                    first_name: u.first_name,
                    last_name: u.last_name,
                    email: u.email,
                    age: u.age,
                    role: u.role
                })
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("jwt",new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET
            },async(jwt_payload,done)=>{
                try {
                    const user = await userModel.findById(jwt_payload.sub)
                    if (!user) return done(null,false)
                    return done(null, {_id: user._id, email: user.email, role: user.role} )
                } catch (error) {
                    return done(error,false)
                }
            }
    ))

    passport.serializeUser((u,done)=>{
        done(null, u._id)
    })
    passport.deserializeUser(async(id,done)=>{
        try {
            const u = await userModel.findById(id)
            if(!u) return done(null,false)
            done(null,u)
        } catch (error) {
            done(error)
        }
    })
}

