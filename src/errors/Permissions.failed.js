import { winstonLogger } from '../middlewares/loggers/logger.js'

export class PermissionsFailed extends Error {
    constructor (message = 'Permissions Error') {
        super(message)
        winstonLogger.warn(message)
        this.type = 'PERMISSIONS_FAILED'
    }
}
