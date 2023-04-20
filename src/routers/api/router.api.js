import { Router } from "express";
import routerSession from "./router.session.js";
import routerUser from "./router.user.js";

const routerApi = Router();

routerApi.use('/session', routerSession);
routerApi.use('/user', routerUser);

export default routerApi;