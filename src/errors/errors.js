export const errors = {
    ERROR_NOT_FOUND: '>>> The requested resource was not found <<<',
    ERROR_INVALID_ARGUMENT: '>>> The argument sent does not comply with the expected format <<<',
    ERR_HTTP_HEADERS_SENT: '>>> You are trying to send the response of a controller more than once <<<'
}

export class Errors {
    constructor () {
        this.ERROR_NOT_FOUND = {
            message: '>>> The requested resource was not found: <<<',
            status: 404
        }
        this.ERROR_INVALID_ARGUMENT = {
            message: '>>> The argument sent does not comply with the expected format: <<<',
            status: 406
        }
        this.ERR_HTTP_HEADERS_SENT = {
            message: '>>> You are trying to send the response of a controller more than once: <<<',
            status: 451
        }
    }

    throwOneError (errorType, value = 'GENERIC_ERROR ') {
        return (`${errorType.message} ${value}`)
    }
}

export const classErrors = new Errors()

//
export class HandlerErrors {
    static createError ({ name = 'Error', cause, message, code = 1 }) {
        const newError = new Error(message, { cause })
        newError.name = name
        newError.code = code
        return newError
    }
}

const handlerErrors = new HandlerErrors()

export const errorLoger = (error, req, res, next) => {
    req.logger.debug(error)
    next(error)
}

export const errorHandlerMidleware = (err, req, res, next) => {
    const error = handlerErrors.createError({ cause: err.stack, message: err.message, code: 2 })
    res.send(error)
}
