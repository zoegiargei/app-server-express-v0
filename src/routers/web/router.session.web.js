import { Router } from "express";
import { authenticationJwtView } from "../../middlewares/passport/passport.strategies.js";

const routerSessionWeb = Router();

routerSessionWeb.get('/', authenticationJwtView, (req, res) => {
    res.render('current', { title: "Current", user: req.user } )
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