import passport from 'passport'
import { AuthenticationFailed } from '../../../errors/Authentication.failed.js'

export function authenticationJwtApi(req, res, next) {
    
    passport.authenticate('jwt', (error, user) => {
        if (error || !user) return next(new AuthenticationFailed())
        const securityUser = { ...JSON.parse(user.payload), password: '' }
        req.user = securityUser
        //req.user = JSON.parse(user.payload)
        next()
    })(req, res, next)
}