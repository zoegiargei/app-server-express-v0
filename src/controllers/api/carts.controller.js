import cartsService from '../../services/carts.service.js';
import productsService from '../../services/products.service.js';

export const contrPostCart = async (req, res) => {
    try {

        const cartInDb = await cartsService.createCart()
        res.json({ cartInDb })

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
};


export const contrGetCart = async (req, res) => {
    try {
        
        const cid = req.params.cid
        const cart = await cartsService.getCartById(cid)
        
        res.json({ cart })

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
};


export const contrProdInCart = async (req, res) => {
    try {

        const cid = req.params.cid
        const pid = req.params.pid
    
        const productById = await productsService.getProductById(pid)

        if(!productById){
            res.status(400).send({ status:"error", error:"Product not existing" })
        }
        
        await cartsService.addToCart(cid, pid)
        
        res.send({ status:"success", message:"Product added to cart" })

    } catch (error) {

        res.status(400).send({ message: error.message })
    }
};


export const contrPutProdInCart = async (req, res) => {
    try {

        const cid = req.params.cid
        const pid = req.params.pid
        const newQuantity = req.body

        if(!newQuantity || !(Number.isInteger(newQuantity)) || Number(newQuantity) < 0 ){
            res.status(400).send({status:"error", error:"Invalidate quantity value"})
        }
        
        await cartsService.updateProdInCart(cid, pid, newQuantity)
        
        res.send({ status:"success", message:"Product in Cart updated" })
        
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const contrDelProdInCart = async (req, res) => {
    try {

        const cid = req.params.cid
        const pid = req.params.pid
        
        await cartsService.delProdInCart(cid, pid)
        
        res.send({ status:"success", message:"Deleted product" })

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const contrPutCart = async (req, res) => {
    try {

        const cid = req.params.cid
        const data = req.body

        await cartsService.loadProductInCart(cid, data)

        res.send({ status:"success", message:"Updated cart" })

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const contrDelAllProds = async (req, res) => {
    try {
        
        const cid = req.params.cid
        await cartsService.deleteAllProducts(cid)
        res.send({ status:"success", message:"Deleted cart" })

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};