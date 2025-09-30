import mongoose from "mongoose"

export function validateId(req,res,next) {
    const id = req.params.cid || req.params.pid
    if(!id) {return next()}
    if (!mongoose.Types.ObjectId.isValid(id)) {return res.status(400).json({ error: "The ID is invalid." }) }
    next()
}