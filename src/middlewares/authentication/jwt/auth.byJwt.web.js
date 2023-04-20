export const authenticationJwtWeb = async (req, res, next) => {
    passport.authenticate('jwt', (error, user) => {

        if (error || !user){
            return res.redirect('/web/login/')
        }
        
        req.user = user
        next()
        
    })(req, res, next)
};