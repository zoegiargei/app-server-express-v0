import express from 'express'
import { PORT } from './configs/server.config.js'
import { MONGO_CNX_STR } from './configs/db.config.js'
import { engine } from 'express-handlebars'
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
// import addIoToReq from './middlewares/req/add.io.req.js'
import compression from 'express-compression'
import { customResponses } from './middlewares/responses/custom.responses.js'
import cluster from 'cluster'
import { cpus } from 'node:os'
import routerTest from './routers/test/router.test.js'
import { createServer } from 'http'
import { errorLogger } from './middlewares/errors/error.logger.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
cluster.schedulingPolicy = cluster.SCHED_RR

const app = express()

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(cookieParser(SECRET_WORD))
app.use(showCookies)
app.use(timeNow)
app.use(customResponses)
// app.use(addIoToReq)
app.use(passportInitialize)
const corsOptions = {
    origin: `http://localhost:${PORT}`,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}
app.use(cors(corsOptions))
app.use(compression({ brotli: { enabled: true, zlib: {} } }))
app.use('/api', routerApi)
app.use('/web', routerWeb)
app.use('/test', routerTest)
app.use(errorLogger)
app.use(errorHandler)

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Server Express API Documentation with Swagger',
            description: 'API documentation for an Express server'
        }
    },
    apis: ['./docs/**/*.yaml']
}
// http://localhost:8080/api/#/Products/get_products_product__id_

const specs = swaggerJSDoc(swaggerOptions)
app.use('/api', swaggerUi.serve, swaggerUi.setup(specs))

app.get('*', (req, res) => {
    if ((/^[/](web)[/][a-z]*$/i).test(req.url)) {
        res.redirect('/web/')
    }
    res.redirect('/web/session/unknownRoute')
})

// import { generateMocks } from './mocks/generateMocks.js'
// await generateMocks()

let io
if (cluster.isPrimary) {
    winstonLogger.info(`I'm the first, my PID is ${process.pid}`)
    for (let i = 0; i < cpus().length; i++) { cluster.fork() }

    cluster.on('exit', worker => {
        winstonLogger.info(`finished process ${worker.process.pid}`)
        cluster.fork()
    })
} else if (cluster.isWorker) {
    winstonLogger.info(`I'm worker, my PID is ${process.pid}`)
    const server = createServer(app)
    server.listen(PORT, () => { winstonLogger.fatal(`Server running on port: ${PORT}`) })

    if (config.PERSISTENCE === 'MONGO') {
        const mongoose = await import('mongoose')
        await mongoose.connect(MONGO_CNX_STR, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    io = new Server(server)
    io.on('connection', async socketSideServer => {
        winstonLogger.warn('Websocket conectado del lado del Servidor')
        configProductsSocket(io, socketSideServer)
        configMessagesSocket(io, socketSideServer)

        app.use((req, res, next) => {
            req.io = io
            next()
        })
    })
}

// export { io }
