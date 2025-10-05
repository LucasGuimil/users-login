import { cartService } from "../services/cart.service.js";
import { productsService } from "../services/products.service.js";
import userModel from "../../config/models/user.model.js";

class CartController {
    async create(req, res) {
        try {
            if (req.user.cart) { return res.status(400).json({ message: `Cart already exists with ID: ${req.user.cart._id}` }) }
            const c = await cartService.create()
            await userModel.findByIdAndUpdate(req.session.user._id, { cart: c })
            req.session.user.cart = req.user.cart
            res.status(201).send(`New cart created succesfully! Your ID cart is: ${c._id}`)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async get(req, res) {
        try {
            const c = await cartService.getById(req.params.cid)
            if (!c) return res.status(404).json({ message: "Cart not found" })
            res.json({ mycart: c })
        } catch (error) {
            res.status(500).send(error)
        }
    }
    //Add products by one unit only with ID
    async add(req, res) {
        try {
            const { cid, pid } = req.params
            let myCart = await cartService.getById(req.params.cid)
            const foundProduct = await productsService.get(pid)
            if (!foundProduct) { return res.status(404).send("Product ID not found in database.") }
            const p = myCart.products.find(product => String(product.productID) === pid)
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
    async replace(req, res) {
        try {
            console.log(req.body)
            const products = await productsService.getAll()
            for (const p of req.body) {
                if (!products.some(product => product._id == p.productID)) {
                    return res.status(400).send("One or more of the added products does not exist in the database. Please check again!")
                }
                const c = await cartService.updateById(req.params.cid, { products: req.body })
                return res.status(200).json({ message: "Cart has been updated!", c })
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }

    //Update quantity of an existing product of the cart.
    async modifyQuantity(req, res) {
        try {
            const { cid, pid } = req.params
            let myCart = await cartService.getById(cid)
            const p = myCart.products.find(product => String(product.productID) === pid)
            if (!p) {
                return res.status(400).send("Product is not added to cart.")
            }
            p.quantity = req.body.quantity
            await cartService.updateById(cid, myCart)
            res.status(200).send("Updated quantity on existing product.")
        } catch (error) { res.status(500).send(error) }
    }

    //Delete one product with ID
    async deleteOne(req, res) {
        try {
            const myCart = await cartService.getById(req.params.cid)
            const p = myCart.products.findIndex(product => String(product.productID) === req.params.pid)
            if (p==-1) { return res.status(400).send("Product is not in cart.") }
            console.log(p)
            myCart.products.splice(p, 1)
            await cartService.updateById(req.params.cid, myCart)
            res.status(200).send("Product deleted!")
        } catch (error) { res.status(500).send(error) }
    }

    async delete(req, res) {
        try {
            await cartService.deleteById(req.params.cid)
            await userModel.findByIdAndUpdate(req.user._id,{cart: null})
            return res.status(204).json()
        } catch (error) { res.status(500).send(error) }
    }
}

export const cartController = new CartController()