import factory from "../../DAO/factory.js";
import Ticket from "../../models/Ticket.js";
import cartsService from "../../services/carts.service.js";
import emailService from "../../services/emails.service.js";
import smsService from "../../services/sms.service.js";


export const handlerNewCart = async (req, res) => {
    try {

        const email = req.user.email
        const cartInDb = await cartsService.createCart(email)
        res.json({ cartInDb })

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
};


export const handlerGetCart = async (req, res) => {
    try {
        
        const cid = req.params.cid
        const cart = await cartsService.getCartById(cid)
        
        res.status(201).json({ cart })

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
};


export const handlerProductInCart = async (req, res) => {
    try {

        const cid = String(req.params.cid)
        const newCid = cid.slice(1)
        const pid = String(req.params.pid)
        const newPid = pid.slice(1)
        const quantity = req.body
        
        await cartsService.addToCart(newCid, newPid, quantity.quantity)
        
        res.status(201).send({ status:"success", message:"Product added to cart" })

    } catch (error) {

        res.status(400).send({ message: error.message })
    }
};


export const handlerUpdateQuantity = async (req, res) => {
    try {

        const cid = req.params.cid
        const pid = req.params.pid
        const newQuantity = req.body

        if(!newQuantity || !(Number.isInteger(newQuantity)) || Number(newQuantity) < 0 ){
            res.status(400).send({status:"error", error:"Invalidate quantity value"})
        }
        
        await cartsService.updateProdInCart(cid, pid, newQuantity)
        
        res.status(201).send({ status:"success", message:"Product in Cart updated" })
        
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const handlerDeleteProduct = async (req, res) => {
    try {

        const cid = req.params.cid
        const pid = req.params.pid
        
        await cartsService.delProdInCart(cid, pid)
        
        res.send({ status:"success", message:"Deleted product" })

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const handlerUpdateCart = async (req, res) => {
    try {

        const cid = req.params.cid
        const data = req.body

        await cartsService.updateProductsCart(cid, data)

        res.status(201).send({ status:"success", message:"Updated cart" })

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const handlerDeleteProducts = async (req, res) => {
    try {
        
        const cid = req.params.cid
        await cartsService.deleteAllProducts(cid)
        res.status(201).send({ status:"success", message:"Deleted cart" })

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
    console.log('>>>>req.user')
    console.log(user)

    const cid = req.user.cart[0]._id
    console.log('>>>>req.user.cart[0]._id')
    console.log(cid)

    const cart = await cartsService.getCartById(cid)
    console.log('>>>>cart')
    console.log(cart)

    console.log('>>>>productsCart')
    const productsCart = cart.productsCart //array
    console.log(productsCart)

    console.log('>>>>cada producto de productsCart') //objetos
    let total = 0
    productsCart.forEach(async element => {
        console.log(element.product)
        console.log(element.quantity)
        const quantity = JSON.parse(element.quantity)
        console.log(element.product.stock)
        
        let stock = JSON.parse(element.product.stock)
        stock = stock - quantity
        console.log('>>>>>stock actualizado')
        console.log(stock)
        
        if(stock > 0){

            console.log('>>>solo si el stock es mayor de 0 pasa')
            
            element.product.stock = stock
            console.log(">>>cada producto de productsCart con stock actualizado")
            console.log(element.product)
    
            const pid = element.product._id
            console.log(String(pid))
            const result = await factory.productsService.updateProduct(String(pid), element.product)
            console.log('resultado de actualizar datos del producto comprado')
            console.log(result)

            element.product.status = true

            console.log(element.product.price)
            total = total + JSON.parse(element.product.price)
        }else{
            element.product.status = false
            console.log(">>>status de los productos no disponibles")
            console.log(element.product.status)
        }
    });

    const newProductsCart = productsCart.filter(element => element.product.status == true)
    console.log(newProductsCart)
    await cartsService.updateProductsCart(cid, newProductsCart)

    if(newProductsCart.length > 0){
        //solo me falta eliminar los productos comprados del carrito
    
        console.log(total)
    
        const ticket = new Ticket(total, user.email)
        console.log(">>> ticket de compra")
        console.log(ticket)
    
        if(user.orders){
            user.orders.push(ticket)
        } else{
            user.orders = []
            user.orders.push(ticket)
        }
    
        console.log('>>>>user, user.orders, user._id in handler purchase')
        console.log(user)
        console.log(user.orders)
        console.log(user._id)
    
            const emailMessage = `
            <h1>Hello ${user.username}!!</h1>
            <h4>Your Ticket</h4>
            <ul>
                <li>CODE: ${ticket.code}</li>
                <li>DATE: ${ticket.purchase_datetime}</li>
                <li>Total purchase: ${ticket.amount}</li>
            </ul>
        `
    
        const smsMessage = `
            Hello!!!!
            Your ticket was sent to your email.
    
            Thank you for the purchase in our Store.
            Best Wishes!
        `
    
        const emailData = await emailService.send('zoegiargei00@gmail.com', emailMessage)
        const smsData = await smsService.sendSms('+543515725379', smsMessage)
    
        res.status(201).json({emailData, smsData})
    }

    res.status(202).json({})

};


export const handlerDeleteCart = async(req, res) => {
    try {
        const cid = req.params.cid
        const deleted = await cartsService.deleteCart(cid)
        res.json({deleted})
    } catch (error) {
        res.send({ message: error.message })
    }
};