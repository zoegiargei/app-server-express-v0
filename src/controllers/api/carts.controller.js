import factory from '../../DAO/factory.js'
import Ticket from '../../models/Ticket.js'
import cartsService from '../../services/carts.service.js'
import emailService from '../../services/emails.service.js'
import smsService from '../../services/sms.service.js'
import ticketsService from '../../services/tickets.service.js'

export const handlerNewCart = async (req, res) => {
    try {
        const email = req.user.email
        const cartInDb = await cartsService.createCart(email)
        res.sendCreated(cartInDb)
    } catch (error) {
        res.sendClientError(error)
    }
}

export const handlerGetCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const cart = await cartsService.getCartById(cid)

        res.sendOk({ message: 'Cart found successfully', object: cart })
    } catch (error) {
        res.sendClientError(error)
    }
}

export const handlerProductInCart = async (req, res) => {
    try {
        const cid = String(req.params.cid)
        const newCid = cid.slice(1)
        const pid = String(req.params.pid)
        const newPid = pid.slice(1)
        const quantity = req.body
        const productAdded = await cartsService.addToCart(newCid, newPid, quantity.quantity)

        res.sendOk({ message: 'Product added to cart successfully', object: productAdded })
    } catch (error) {
        res.sendClientError(error)
    }
}

export const handlerUpdateQuantity = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const newQuantity = req.body

        if (!newQuantity || !(Number.isInteger(newQuantity)) || Number(newQuantity) < 0) {
            res.status(400).send({ status: 'error', error: 'Invalidate quantity value' })
        }
        const productUpdated = await cartsService.updateProdInCart(cid, pid, newQuantity)
        res.sendCreated({ message: 'Product in Cart updated successfully', object: productUpdated })
    } catch (error) {
        res.sendClientError(error)
    }
}

export const handlerDeleteProduct = async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const productDeleted = await cartsService.delProdInCart(cid, pid)
        res.sendOk({ message: 'The product was deleted successfully', object: productDeleted })
    } catch (error) {
        res.sendClientError(error)
    }
}

export const handlerUpdateCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const data = req.body
        const updatedCart = await cartsService.updateProductsCart(cid, data)
        res.sendCreated({ message: 'Cart updated successfully', object: updatedCart })
    } catch (error) {
        res.sendClientError(error)
    }
}

export const handlerDeleteProducts = async (req, res) => {
    try {
        const cid = req.params.cid
        const updatedCart = await cartsService.deleteAllProducts(cid)
        res.sendCreated({ message: 'Cart deleted successfully', object: updatedCart })
    } catch (error) {
        res.sendClientError(error)
    }
}

export const handlerShowCart = async (req, res) => {
    try {
        const cart = req.user.cart
        res.sendCreated({ message: 'Handler show cart', object: cart })
    } catch (error) {
        res.sendClientError(error)
    }
}

// I must fix this controller: I have to see the product quantity and delete comments
export const handlerPurchase = async (req, res) => {
    const user = req.user
    req.logger.debug('>>>>req.user')
    req.logger.debug(user)

    const cid = req.user.cart[0]._id
    req.logger.debug('>>>>req.user.cart[0]._id')
    req.logger.debug(cid)

    const cart = await cartsService.getCartById(cid)
    req.logger.debug('>>>>cart')
    req.logger.debug(cart)

    req.logger.debug('>>>>productsCart')
    const productsCart = cart.productsCart // array
    req.logger.debug(productsCart)

    req.logger.debug('>>>>cada producto de productsCart') // objetos
    let total = 0
    productsCart.forEach(async element => {
        req.logger.debug(element.product)
        req.logger.debug(element.quantity)
        const quantity = JSON.parse(element.quantity)
        req.logger.debug(element.product.stock)
        const stock = JSON.parse(element.product.stock)
        req.logger.debug('>>>Es el stock mayor que 0 y que quantity???')
        req.logger.debug((stock > 0 && stock > quantity))

        if ((stock > 0 && stock > quantity) === true) {
            req.logger.debug('>>>solo si el stock es mayor de 0 y mayor que quantity pasa')
            req.logger.debug('>>>>>stock actualizado')

            element.product.stock = element.product.stock - quantity
            req.logger.debug('>>>cada producto de productsCart con stock actualizado')
            req.logger.debug(element.product)
            const pid = element.product._id
            req.logger.debug(String(pid))
            const result = await factory.productsService.updateProduct(String(pid), element.product)
            req.logger.debug('resultado de actualizar datos del producto comprado')
            req.logger.debug(result)
            element.product.status = true
            total = total + JSON.parse(element.product.price)
        } else {
            element.product.status = false
            req.logger.debug('>>>status de los productos no disponibles')
            req.logger.debug(element.product.status)
        }
    })

    req.logger.debug('>>>>cart con todos los productos disponibles')
    const newProductsCart = productsCart.filter(element => element.product.status === true)
    const productsCartNotAvailable = productsCart.filter(element => element.product.status === false)

    const productsCartUpdated = await cartsService.updateProductsCart(cid, productsCartNotAvailable)

    if (newProductsCart.length > 0) {
        req.logger.debug(total)
        const ticket = new Ticket(total, user.email)
        await ticketsService.saveTicket(ticket)
        req.logger.debug('>>> ticket de compra')
        req.logger.debug(ticket)
        if (user.orders) {
            user.orders.push(ticket)
        } else {
            user.orders = []
            user.orders.push(ticket)
        }
        req.logger.debug('>>>>user, user.orders, user._id in handler purchase')
        req.logger.debug(user)
        req.logger.debug(user.orders)
        req.logger.debug(user._id)
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
        return res.sendCreated({ message: 'A ticket was generated. The email and sms were sent successfully', object: [emailData, smsData] })
    }

    res.sendAccepted({ message: 'There are products that are not available, they remain in the cart', object: productsCartUpdated })
}

export const handlerDeleteCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const deleted = await cartsService.deleteCart(cid)
        res.sendOk({ message: 'Cart deleted successfully', object: deleted })
    } catch (error) {
        res.sendClientError(error)
    }
}
