import { AuthenticationFailed } from "../../../errors/Authentication.failed.js";

export const authenticationJwtApi = async (req, res, next ) => {
    passport.authenticate('jwt', (error, user, info) => {

        if (error || !user) {
            return next(new AuthenticationFailed())
        }

        req.user = user
        next()
    })(req, res, next)
};