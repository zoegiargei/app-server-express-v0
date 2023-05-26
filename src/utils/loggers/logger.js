import winston, { format } from 'winston'
import config from '../../../config.js'

let transports
// eslint-disable-next-line no-unused-vars
const levels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5
}
const colors = {
    fatal: 'red',
    error: 'red',
    warn: 'magenta',
    info: 'green',
    http: 'cyan',
    debug: 'black'
}

winston.addColors(colors)

const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

if (config.NODE_ENV === 'dev') {
    transports = [
        new winston.transports.Console({
            level: 'debug'
        })
    ]
} else if (config.NODE_ENV === 'test') {
    transports = [
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'error.log.envTest'
        })
    ]
} else if (config.NODE_ENV === 'prod') {
    transports = [
        new winston.transports.File({
            level: 'info',
            filename: 'info.log.envProd'
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'error.log.envProd'
        })
    ]
}

export const winstonLogger = winston.createLogger({
    levels,
    format: format.combine(
        format.colorize(),
        format.label('Logg!'),
        format.timestamp(),
        myFormat
    ),
    transports
})

export const logger = (req, res, next) => {
    winstonLogger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    req.logger = winstonLogger
    next()
}
