export function errorLogger (error, req, res, next) {
    console.log(error)
    const status = error.status || 500
    req.logger.fatal(`${status}: ${error.message}`)
    next(error)
}
