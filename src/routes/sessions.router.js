import { Router } from "express"
import passport from "passport"


const sessionsRouter = Router()

sessionsRouter.post("/login", async (req,res,next)=> {
    try{
    passport.authenticate("local",(error, u, info)=> {
        if(error) return next(error)
        if(!u) return res.status(400).json({error: info?.message|| "Invalid credentials"})
        
        req.logIn(u,{session:true},(error2) =>{
            if(error2) return next(error2)
            req.session.user = u
            return res.json({message: "Logged in (local)"})
        })
    }
)(req, res, next)} 
catch(error){
    res.status(500).json({error})
}
})

sessionsRouter.post("/logout", async(req,res,next)=>{
    try {
        req.logOut({keepSessionInfo: true},(error)=>{
            if(error) return next(error)
            if(req.session) {
                req.session.destroy((error2)=>{
                    if(error2) return next(error2)
                    res.clearCookie("connect.sid")
                    return res.json({message: "Logged out (local)"})

                })
            } else {
                res.clearCookie("connect.sid")
                return res.json({message: "Logged out (local)"})
            }
        })
    } catch (error) {
        res.status(500).json({error})       
    }
})

sessionsRouter.get("/current", async(req,res)=>{
    try {
        if(req.session) return res.json({payload: req.session.user})
    } catch (error) {
        res.status(500).json({error}) 
    }
})
export default sessionsRouter