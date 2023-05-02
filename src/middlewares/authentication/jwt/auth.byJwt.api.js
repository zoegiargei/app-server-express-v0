import passport from "passport";
import { AuthenticationFailed } from "../../../errors/Authentication.failed.js";

export function authenticationJwtApi(req, res, next) {
    
    passport.authenticate('jwt', (error, user) => {
        if (error || !user) return next(new AuthenticationFailed())
        req.user = user
        next()
    })(req, res, next)
};