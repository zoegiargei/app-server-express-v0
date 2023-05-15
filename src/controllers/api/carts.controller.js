import cartsService from "../../services/carts.service.js";
import ticketsService from "../../services/tickets.service.js";
import usersService from "../../services/users.service.js";

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

        const cid = String(req.params.cid)
        const newCid = cid.slice(1)
        const pid = String(req.params.pid)
        const newPid = pid.slice(1)
        const quantity = req.body
        
        await cartsService.addToCart(newCid, newPid, quantity.quantity)
        
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

export const handlerShowCart = async (req, res) => {
    try {
        console.log('>>>>>>handlerShowCart - Cart ID')
        const cart = req.user.cart
        res.status(201).json({ cart })
    } catch (error) {
        res.send({ message: error.message })
    }
}

export const handlerPurchase = async (req, res) => {

    const user = req.user
    const cid = req.user.cart[0]._id
    const cart = await cartsService.getCartById(cid)

    let total = 0

    console.log('>>>>>cart ')
    console.log(cart)

    cart.productsCart.forEach(prod => {
        total = total + (prod.quantity * prod.product.price)
    })

    console.log('>>>>>>>Total de la compra')
    console.log(total)

    const ticket = await ticketsService.generateTicket(total, user.email)

    if(user.orders){
        user.orders.push(ticket)
    } else{
        user.orders = []
        user.orders.push(ticket)
    }

    console.log(user)
    console.log(user.orders)

    await cartsService.deleteAllProducts(cid)
    await usersService.updateUser(user._id, user)

    res.status(201).redirect('/api/carts/email')
};