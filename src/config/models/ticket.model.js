import mongoose from "mongoose";

const ticketCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        default: String(this.id),
    },
    amount: {
        type: Number, require: true
    },
    purchaser: {
        type: String,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        default: null
    }
}, {
    timestamps: {
        updatedAt: false,
        createdAt: purchase_datetime
    }
})

const ticketModel = new mongoose.model(ticketCollection, ticketSchema)
export default ticketModel
