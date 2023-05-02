import { Router } from "express";
import { authenticationJwtWeb } from "../../middlewares/authentication/jwt/auth.byJwt.web.js";

const routerSessionWeb = Router();

routerSessionWeb.get('/', authenticationJwtWeb, (req, res) => {
    console.log(JSON.parse(req.user.payload))
    console.log(req.user)
    res.render('current', { title: "Current", user: JSON.parse(req.user.payload) } )
});

routerSessionWeb.get('/register', (req, res) => { 
    res.render('register', { title: 'JOIN US' }) 
});

routerSessionWeb.get('/login', (req, res) => {
    res.render('login', { title: "LOGIN" })
});

routerSessionWeb.get('/unknownRoute', (req, res) => {
    res.render('unknownRoute', { title: 'Unknown Route', url: req.url })
});

export default routerSessionWeb;