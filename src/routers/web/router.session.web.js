import { Router } from "express";
import { authenticationJwtView } from "../../middlewares/passport/passport.strategies.js";

const routerSessionWeb = Router();

routerSessionWeb.get('/', authenticationJwtView, (req, res) => {
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