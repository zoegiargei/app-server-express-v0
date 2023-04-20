import { Router } from "express";
import routerProductsWeb from "./router.products.web.js";
import routerSessionWeb from "./router.session.web.js";

const routerWeb = Router();

routerWeb.use('/session', routerSessionWeb);
routerWeb.use('/products', routerProductsWeb);

export default routerWeb;