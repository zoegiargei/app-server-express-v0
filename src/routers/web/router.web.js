import { Router } from "express";
import routerChatWeb from "./router.chat.web.js";
import routerErrorWeb from "./router.error.web.js";
import routerProductsWeb from "./router.products.web.js";
import routerSessionWeb from "./router.session.web.js";

const routerWeb = Router();

routerWeb.use('/session', routerSessionWeb);
routerWeb.use('/products', routerProductsWeb);
routerWeb.use('/chat', routerChatWeb);
routerWeb.use('/error', routerErrorWeb);

export default routerWeb;