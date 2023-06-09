import encryptedJWT from '../../utils/jwt/encrypted.jwt.js'

export function contrLoggedIn (req, res, next) {
    try {
        if (!req.user) return new Error()
        const ttl = '2h'
        res.cookie('jwt_authorization', encryptedJWT.encryptData(req.user, ttl), { signed: true, httpOnly: true })
        res.redirect('/web/session/')
    } catch (error) {
        res.sendAuthenticationError()
    }
}
