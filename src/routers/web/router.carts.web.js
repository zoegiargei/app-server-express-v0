import { Router } from 'express'
import { authenticationJwtWeb } from '../../middlewares/authentication/jwt/auth.byJwt.web.js'
import cartsService from '../../services/carts.service.js'

const routerCartsWeb = Router()

routerCartsWeb.get('/cartById', authenticationJwtWeb, async (req, res) => {
    const cartById = req.user.cart[0]._id
    const cart = await cartsService.getCartById(cartById)
    const products = cart.productsCart
    const thAreProducts = products.length > 0
    const loggedin = req.user
    const cartQuantity = (products).length

    res.render('yourCart', { title: 'Your Cart', loggedin, thAreProducts, products, cartId: cartById, quantity: cartQuantity })
})

export default routerCartsWeb
