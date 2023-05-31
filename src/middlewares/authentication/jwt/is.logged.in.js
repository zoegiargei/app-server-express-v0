import passport from 'passport'

export function authenticationJwtLoggedIn (req, res, next) {
    passport.authenticate('jwt', (error, user) => {
        if (!user) return next(error)
        next(res.redirect('/web/session/'))
    })(req, res, next)
}
