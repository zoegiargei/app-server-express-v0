import { Router } from "express";
import { contrShowProducts } from "../../controllers/web/prod.web.controller.js";
import { authenticationByRole } from "../../middlewares/authentication/authentication.byRole.js";
import { authenticationJwtWeb } from "../../middlewares/authentication/jwt/auth.byJwt.web.js";

const routerProductsWeb = Router();

routerProductsWeb.get('/products', authenticationJwtWeb, contrShowProducts)
routerProductsWeb.get('/addProduct', authenticationJwtWeb, authenticationByRole(['Auth']), (req, res) => {
    
    const loggedin = req.user
    res.render('addProduct', { title: 'AddProduct', loggedin:loggedin })
});

export default routerProductsWeb;