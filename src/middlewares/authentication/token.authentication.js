/* import encryptedJWT from '../../utils/jwt/encrypted.jwt.js'
import { AuthenticationFailed } from '../../errors/Authentication.failed.js'

export function userAuthenticate(req, res, next){    
    try {

        const token = req.signedCookies.jwt_authorization
        if(!token){
            return next(new AuthenticationFailed())
        }
        const user = encryptedJWT.decryptData(token)
        req.user = user
        return next()

    } catch (error) {
        return next(new Error(error.message))
    }
} */