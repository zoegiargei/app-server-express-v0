import { Router } from "express";
import { contrShowProducts } from "../../controllers/web/prod.web.controller.js";
import { authenticationJwtView } from "../../middlewares/passport/passport.strategies.js";

const routerProductsWeb = Router();

routerProductsWeb.get('/products', authenticationJwtView, contrShowProducts)

export default routerProductsWeb;