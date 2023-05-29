function timeNow (req, res, next) {
    const today = new Date()
    const time = ('Time:', today.toLocaleDateString(), today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds())
    req.logger.info(String(`Time now: ${time}`))
    next()
}

export default timeNow
