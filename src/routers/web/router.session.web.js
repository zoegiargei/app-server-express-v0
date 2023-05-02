import { Router } from "express";
import { authenticationJwtLoggedIn } from "../../middlewares/authentication/jwt/is.logged.in.js";
import { authenticationJwtWeb } from "../../middlewares/authentication/jwt/auth.byJwt.web.js";

const routerSessionWeb = Router();

routerSessionWeb.get('/', authenticationJwtWeb, (req, res) => {

    console.log("authentication jwt web")
    console.log(req.user)

    res.render('current', { title: "Current", user: req.user } )
});

routerSessionWeb.get('/register', authenticationJwtLoggedIn, (req, res) => { 
    res.render('register', { title: 'JOIN US' }) 
});

routerSessionWeb.get('/login', authenticationJwtLoggedIn, (req, res) => {
    res.render('login', { title: "LOGIN" })
});

routerSessionWeb.get('/unknownRoute', (req, res) => {
    res.render('unknownRoute', { title: 'Unknown Route', url: req.url })
});

export default routerSessionWeb;