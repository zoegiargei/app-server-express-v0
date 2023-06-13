export class Errors {
    constructor () {
        this.ERROR_NOT_FOUND = {
            message: 'NOT FOUND',
            status: 404
        }
        this.INVALID_REQ_ERROR = {
            message: 'BAD REQUEST',
            status: 400
        }
        this.ERROR_INVALID_ARGUMENT = {
            message: 'NOT ACCEPTABLE',
            status: 406
        }
        this.AUTH_FAILED = {
            message: 'PROXY AUTHENTICATION REQUIRED',
            status: 407
        }
        this.PERMISSIONS_FAILED = {
            message: 'UNAUTHORIZED',
            status: 401
        }
        this.FORBIDDEN = {
            message: 'NOT ALLOWED',
            status: 403
        }
        this.INTERNAL_ERROR = {
            message: 'INTERNAL SERVER ERROR',
            status: 500
        }
    }

    throwOneError (errorType, description = 'GENERIC_ERROR ') {
        const message = `${errorType.message}: ${description}`
        const error = new Error(message)
        const status = errorType.status
        error.status = status
        throw error
    }
}
export const errorsModel = new Errors()
