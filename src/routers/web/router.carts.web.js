import { Router } from "express";
import { authenticationJwtWeb } from "../../middlewares/authentication/jwt/auth.byJwt.web.js";
import cartsService from "../../services/carts.service.js";

const routerCartsWeb = Router();

routerCartsWeb.get('/cartById', authenticationJwtWeb, async (req, res) => {

    console.log('>>>>> Cart by id router Web')
    console.log(req.user.cart[0]._id)

    const cart = await cartsService.getCartById(req.user.cart[0]._id)
    //const cart = req.user.cart[0]

    const products = cart.productsCart
    const thAreProducts = products.length > 0 ? true : false

    res.render('yourCart', { title: 'Your Cart', thAreProducts: thAreProducts, products: products, cartId: req.user.cart[0]._id })
});

export default routerCartsWeb;