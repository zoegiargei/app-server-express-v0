import { Router } from "express";
import routerCartsWeb from "./router.carts.web.js";
import routerChatWeb from "./router.chat.web.js";
import routerErrorWeb from "./router.error.web.js";
import routerProductsWeb from "./router.products.web.js";
import routerSessionWeb from "./router.session.web.js";
import routerUsersWeb from "./router.users.web.js";

const routerWeb = Router();

routerWeb.use('/session', routerSessionWeb);
routerWeb.use('/products', routerProductsWeb);
routerWeb.use('/chat', routerChatWeb);
routerWeb.use('/error', routerErrorWeb);
routerWeb.use('/users', routerUsersWeb);
routerWeb.use('/carts', routerCartsWeb);
export default routerWeb;