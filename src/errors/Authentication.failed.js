import { winstonLogger } from '../middlewares/loggers/logger.js'

export class AuthenticationFailed extends Error {
    constructor (message = 'Authentication Error') {
        super(message)
        winstonLogger.warn(message)
        this.type = 'AUTH_FAILED'
    }
}
