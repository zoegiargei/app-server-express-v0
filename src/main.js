import express from "express";
import { PORT } from "./configs/server.config.js";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import { MONGO_CNX_STR } from "./configs/db.config.js";
import cookieParser from "cookie-parser";
import { SECRET_WORD } from "./configs/cookie.config.js";
import showCookies from "./middlewares/cookies/show.cookies.js";
import timeNow from "./middlewares/responses/time.now.js";
import routerApi from "./routers/api/router.api.js";
import routerWeb from "./routers/web/router.web.js";
import { passportInitialize } from "./middlewares/passport/passport.strategies.js";
import cors from "cors";
import { Server } from "socket.io";
import { configProductsSocket } from "./socket/products.socket.js";
import { configMessagesSocket } from "./socket/chat.socket.js";
import { errorHandler } from "./middlewares/errors/error.handler.js";
import addIoToReq from "./middlewares/req/add.io.req.js";
//import __dirname from "./utils/path/dirname.js";
import compression from "express-compression";
import { customResponses } from "./middlewares/responses/custom.responses.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
//app.use(express.static(__dirname + './public'));
app.use(express.static('./public'));
app.use(cookieParser(SECRET_WORD));
app.use(showCookies);
app.use(timeNow);
app.use(passportInitialize);
app.use(errorHandler);
app.use(addIoToReq);
app.use(customResponses);
app.use(cors({
    origin:`http://localhost:${PORT}`
}));

app.use(compression({ brotli: { enabled: true, zlib: {} } }))

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use('/api', routerApi);
app.use('/web', routerWeb);

app.get('*', (req, res) => {
    
    if((/^[/](web)[/][a-z]*$/i).test(req.url)){
        res.redirect('/web/')
    }

    res.redirect('/web/session/unknownRoute')
});

mongoose.connect(MONGO_CNX_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



export const HTTPserver = app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)});

export const io = new Server(HTTPserver);
io.on('connection', async socketSideServer => {
    console.log('message on side server: New client connected!')

    configProductsSocket(io, socketSideServer)
    configMessagesSocket(io, socketSideServer)
});

//import { generateMocks } from "./mocks/generateMocks.js";
//await generateMocks()