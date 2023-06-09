import passport from 'passport'
import { errorsModel } from '../../models/Errors.js'

export function passportCall (strategy) {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) {
                err.status = 407
                return next(err)
            }
            if (!user) {
                return errorsModel.throwOneError(errorsModel.AUTH_FAILED, 'You are not authenticated')
            }
            req.user = user
            next()
        })(req, res, next)
    }
}
