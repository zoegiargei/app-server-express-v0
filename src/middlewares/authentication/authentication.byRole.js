import { errorsModel } from '../../models/Errors.js'

export const authenticationByRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            // res.redirect('/web/error/')
            next(errorsModel.throwOneError(errorsModel.AUTH_FAILED, 'You are not logged in'))
        }
        if (roles.includes(req.user.role)) {
            next()
        } else {
            // res.redirect('/web/error/')
            next(errorsModel.throwOneError(errorsModel.PERMISSIONS_FAILED, 'You are not allowed to get that resource'))
        }
    }
}
