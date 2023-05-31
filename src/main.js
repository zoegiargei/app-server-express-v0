import express from 'express'
import { PORT } from './configs/server.config.js'
import { engine } from 'express-handlebars'
import { MONGO_CNX_STR } from './configs/db.config.js'
import config from '../config.js'
import { logger, winstonLogger } from './middlewares/loggers/logger.js'
import cookieParser from 'cookie-parser'
import { SECRET_WORD } from './configs/cookie.config.js'
import showCookies from './middlewares/cookies/show.cookies.js'
import timeNow from './middlewares/responses/time.now.js'
import routerApi from './routers/api/router.api.js'
import routerWeb from './routers/web/router.web.js'
import { passportInitialize } from './middlewares/passport/passport.strategies.js'
import cors from 'cors'
import { Server } from 'socket.io'
import { configProductsSocket } from './socket/products.socket.js'
import { configMessagesSocket } from './socket/chat.socket.js'
import { errorHandler } from './middlewares/errors/error.handler.js'
import addIoToReq from './middlewares/req/add.io.req.js'
import compression from 'express-compression'
import { customResponses } from './middlewares/responses/custom.responses.js'
import cluster from 'cluster'
import { cpus } from 'node:os'
import routerTest from './routers/test/router.test.js'
cluster.schedulingPolicy = cluster.SCHED_RR

const app = express()

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(cookieParser(SECRET_WORD))
app.use(showCookies)
app.use(timeNow)
app.use(passportInitialize)
app.use(errorHandler)
app.use(addIoToReq)
app.use(customResponses)
app.use(cors({ origin: `http://localhost:${PORT}` }))
app.use(compression({ brotli: { enabled: true, zlib: {} } }))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/api', routerApi)
app.use('/web', routerWeb)
app.use('/test', routerTest)

app.get('*', (req, res) => { if ((/^[/](web)[/][a-z]*$/i).test(req.url)) { res.redirect('/web/') } res.redirect('/web/session/unknownRoute') })

if (config.PERSISTENCE === 'MONGO') {
    const mongoose = await import('mongoose')
    await mongoose.connect(MONGO_CNX_STR, { useNewUrlParser: true, useUnifiedTopology: true })
}

// import { generateMocks } from './mocks/generateMocks.js'
// await generateMocks()

let HTTPserver
if (cluster.isPrimary) {
    winstonLogger.info(`I'm the first, my PID is ${process.pid}`)
    for (let i = 0; i < cpus().length; i++) { cluster.fork() }

    cluster.on('exit', worker => {
        winstonLogger.info(`finished process ${worker.process.pid}`)
        cluster.fork()
    })
} else if (cluster.isWorker) {
    winstonLogger.info(`I'm worker, my PID is ${process.pid}`)
    HTTPserver = app.listen(PORT, () => { winstonLogger.fatal(`Server running on port: ${PORT}`) })
}

export const io = new Server(HTTPserver)
io.on('connection', async socketSideServer => {
    configProductsSocket(io, socketSideServer)
    configMessagesSocket(io, socketSideServer)
})
