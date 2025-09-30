import passport from "passport";

export function requiredLogin(req, res, next) {
    if (!req.session.user) return res.status(401).json({ error: "You need to be logged in first." })
    next()
}

export function alreadyLogged(req,res,next) {
    if (req.session.user) return res.status(403).json({error: "Already logged in"})
    next()
}

export const requireJwt = passport.authenticate("jwt",{session: false})

export function requireAdmin(req,res,next) {
    if(req.session.user.role != "admin") return res.status(403).json({error: "This operation requires an admin role."})
    next()
}

export const requiredRole = (...roles) => (req,res,next)=>{
    if(!req.session.user) return res.status(401).json({ error: "You need to be logged in first." })
    if(!roles.includes(req.session.user.role)) return res.status(403).json({error: `This operation requires an ${roles} role.`})
    next()
}



