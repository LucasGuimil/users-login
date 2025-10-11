import mongoose from "mongoose"

export function validateId(req, res, next) {

    if (req.params.cid) {
        if (!mongoose.Types.ObjectId.isValid(req.params.cid)) { return res.status(400).json({ error: "The ID is invalid." }) }
        if (req.params.cid != req.session.user.cart) { return res.status(403).json({ message: "That is not your cart ID." }) }
        if (!req.session.user.cart) { return res.status(400).json({ message: "Cart is not created." }) }
    }
    if (req.params.pid) {
        if (!mongoose.Types.ObjectId.isValid(req.params.pid)) { return res.status(400).json({ error: "The ID is invalid." }) }
    }
    if (req.params.uid) {
        if (!mongoose.Types.ObjectId.isValid(req.params.uid)) { return res.status(400).json({ error: "The ID is invalid." }) }
    }
    next()
}