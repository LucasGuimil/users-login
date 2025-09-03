import passport from "passport";

export function requiredLogin(req, res, next) {
    if (!req.session.user) return res.status(401).json({ error: "You need to be logged in first." })
    next()
}

export function alreadyLogged(req,res,next) {
    if (req.session.user) return res.status(403).json({error: "Already logged in"})
    next()
}

