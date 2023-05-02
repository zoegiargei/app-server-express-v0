import passport from "passport";

export function authenticationJwtWeb(req, res, next) {
    passport.authenticate('jwt', (error, user) => {

        if (error || !user) return res.redirect('/web/session/login')
        req.user = JSON.parse(user.payload)
        next()
    })(req, res, next)
};