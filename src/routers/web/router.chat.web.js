import { Router } from "express";
import { authenticationJwtWeb } from "../../middlewares/authentication/jwt/auth.byJwt.web.js";
import { authenticationByRole } from "../../middlewares/authentication/authentication.byRole.js";

const routerChatWeb = Router();

routerChatWeb.get('/', authenticationJwtWeb, authenticationByRole(['User']), async (req, res) => {
    res.render('chat', { title: 'Chat Websocket' })
});

export default routerChatWeb;