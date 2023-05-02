import { Router } from "express";
import { contrShowProducts } from "../../controllers/web/prod.web.controller.js";
import { authenticationJwtWeb } from "../../middlewares/authentication/jwt/auth.byJwt.web.js";

const routerProductsWeb = Router();

routerProductsWeb.get('/products', authenticationJwtWeb, contrShowProducts)

export default routerProductsWeb;