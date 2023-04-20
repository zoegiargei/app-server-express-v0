import express from "express";
import { PORT } from "./configs/server.config.js";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import { MONGO_CNX_STR } from "./configs/db.config.js";
import cookieParser from "cookie-parser";
import { SECRET_WORD } from "./configs/cookie.config.js";
import showCookies from "./middlewares/cookies/show.cookies.js";
import routerApi from "./routers/api/router.api.js";
import routerWeb from "./routers/web/router.web.js";
import { passportInitialize } from "./middlewares/passport/passport.strategies.js";

const app = express(); // Servidor con express

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('./public'));
app.use(cookieParser(SECRET_WORD));
app.use(showCookies);
app.use(passportInitialize);

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use('/api', routerApi)
app.use('/web', routerWeb)

app.get('*', (req, res) => {
    res.redirect('/web/session/unknownRoute')
	res.send(`unknown route ${ req.url }`)
});

mongoose.connect(MONGO_CNX_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export const HTTPserver = app.listen(PORT, () => {console.log(`Server running on port: ${ PORT }`)});