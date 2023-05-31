export function errorHandler (error, req, res, next) {
    switch (error.type) {
        case 'AUTH_FAILED':
            req.messageError = error.type
            error.status = 401
            break
        case 'PERMISSIONS_FAILED':
            req.messageError = error.type
            error.status = 403
            break
        default:
            req.messageError = error.type
            error.status = 500
    }
    req.logger.fatal(error.message)
    const status = error.status || 400
    res.header('Content-Type', 'application/json')
    res.status(status).json({ errorMsg: error.message })
}
