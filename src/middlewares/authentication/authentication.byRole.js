import { AuthenticationFailed } from '../../errors/Authentication.failed.js'
import { PermissionsFailed } from '../../errors/Permissions.failed.js'

export const authenticationByRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.redirect('/web/error/')
            next(new AuthenticationFailed())
        }
        if (roles.includes(req.user.role)) {
            next()
        } else {
            res.redirect('/web/error/')
            next(new PermissionsFailed())
        }
    }
}
