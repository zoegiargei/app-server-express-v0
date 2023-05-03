import { Router } from "express";
import cartsService from "../../services/carts.service.js";

const routerCartsWeb = Router();

routerCartsWeb.get('/cart', async (req, res) => {
    //hardcodeado
    const cart = await cartsService.getCartById('642aa1d24bbf1a0de12fb332')
    const products = cart.productsCart
    console.log(products)
    const thAreProducts = products ? true : false
    //const linkSeeProduct = `http://localhost:8080/products/product/:${}`
    res.render('yourCart', { title: 'Your Cart', thAreProducts: thAreProducts, products: products })
});

export default routerCartsWeb;