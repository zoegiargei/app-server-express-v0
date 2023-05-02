import { Router } from "express";

const routerChatWeb = Router();

routerChatWeb.get('/', async (req, res) => {
    res.render('chat', { title: 'Chat Websocket' })
});

export default routerChatWeb;