import { cartService } from "../services/cart.service.js";
import { productsService } from "../services/products.service.js";

class CartController {
    async create(req, res) {
        try {
            if (req.session.user.cart) { return res.status(404).json({ message: `Cart already exists with ID: ${c._id}` }) }
            const c = await cartService.create()
            req.session.user.cart = c
            res.status(201).send(`New cart created succesfully! Your ID cart is: ${c._id}`)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async get(req, res) {
        try {
            if (req.params.cid != req.session.user.cart._id) { return res.status(403).json({ message: "That is not your cart ID." }) }
            const c = await cartService.getById(req.params.cid)
            if (!c) return res.status(404).json({ message: "Cart not found" })
            res.json({ c })
        } catch (error) {
            res.status(500).send(error)
        }
    }
    //Add products by one unit only with ID
    async add(req, res) {
        try {
            const { cid, pid } = req.params
            const myCart = req.session.user.cart
            if (!myCart) { return res.status(400).json({ message: "Cart is not created." }) }
            const foundProduct = await productsService.get(pid)
            if (!foundProduct) { return res.status(404).send("Product ID not found in database.") }
            const p = myCart.products.find(p => p.productID === pid)
            if (!p) {
                myCart.products.push({ productID: pid, quantity: 1 })
                await cartService.updateById(cid, myCart)
                return res.status(201).send("Product added to cart.")
            }
            p.quantity++
            await cartService.updateById(cid, myCart)
            res.status(200).send("Updated quantity on existing product.")
        } catch (error) {
            res.status(500).send(error)
        }
    }

    //Replace all products on cart.
    async replace(req,res) {
        try {
            const products = await productsService.getAll()
            for (const p of req.body) {
            if (!products.some(product => product._id==p.productID)) {
                return res.status(400).send("One or more of the added products does not exist in the database. Please check again!")
            }
        }
        } catch (error) {
            
        }
    }


}

export const cartController = new CartController()