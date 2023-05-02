import passport from "passport";

export function authenticationJwtWeb(req, res, next) {
    passport.authenticate('jwt', (error, user) => {

        if (error || !user) return res.redirect('/web/session/login')
        req.user = user
        next()
    })(req, res, next)
};