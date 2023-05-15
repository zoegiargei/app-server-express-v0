import { Router } from "express";
import { authenticationJwtWeb } from "../../middlewares/authentication/jwt/auth.byJwt.web.js";
import cartsService from "../../services/carts.service.js";

const routerCartsWeb = Router();

routerCartsWeb.get('/cartById', authenticationJwtWeb, async (req, res) => {

    console.log('your cart')
    console.log(req.user.cart)
    const cartById = req.user.cart[0]._id
    const cart = await cartsService.getCartById(cartById)
    console.log(cart)
    
    const products = cart.productsCart
    console.log(products)
    const thAreProducts = products.length > 0 ? true : false
    const loggedin = req.user
    const cartQuantity = (products).length

    res.render('yourCart', { title: 'Your Cart', loggedin:loggedin, thAreProducts: thAreProducts, products: products, cartId: cartById, quantity: cartQuantity })
});

export default routerCartsWeb;