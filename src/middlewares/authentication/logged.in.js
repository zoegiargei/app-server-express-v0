import { errorsModel } from '../../models/Errors.js'

export function loggedIn (req, res, next) {
    if (!req.user) {
        next(errorsModel.throwOneError(errorsModel.AUTH_FAILED, 'You are not logged in'))
    }
    next()
}
