import { Router } from "express";
import { contrShowProducts } from "../../controllers/web/prod.web.controller.js";
import factory from "../../DAO/factory.js";
import { authenticationByRole } from "../../middlewares/authentication/authentication.byRole.js";
import { authenticationJwtWeb } from "../../middlewares/authentication/jwt/auth.byJwt.web.js";

const routerProductsWeb = Router();

routerProductsWeb.get('/products', authenticationJwtWeb, contrShowProducts)
routerProductsWeb.get('/addProduct', authenticationJwtWeb, authenticationByRole(['Admin']), (req, res) => {
    
    const loggedin = req.user
    res.render('addProduct', { title: 'AddProduct', loggedin:loggedin })
});

routerProductsWeb.get('/product/:pid', authenticationJwtWeb, authenticationByRole(['Admin', 'User']), async (req, res) => {

    const loggedin = req.user
    const pid = String(req.params.pid)
    const newPid = pid.slice(1)
    const product = await factory.productsService.getProductById(newPid)

    let cid
    if(typeof(req.user.cart) === 'object'){
        cid = req.user.cart[0]._id
    } else if(req.user.cart._id){
        cid = req.user.cart._id
    } else if(req.user.cart){
        cid = req.user.cart
    }

    res.render('product', { title: 'Details of product', loggedin: loggedin, product: product, cartId: cid, stock: product.stock })
});

export default routerProductsWeb;