import { cartService } from "../services/cart.service.js"
import { cartTotal } from "../utils/cart.util.js"

cartService
class TicketController{
    async create(req,res){
        try {
            const c = await cartService.getById(req.params.cid).populate("products")
            if(!c) {return res.status(404).send("Cart ID not found.")}
            const total = cartTotal(c)
            console.log(total)
        } catch (error) {
            
        }
    }
}