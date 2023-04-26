import passport from "passport";
import usersService from "../../services/users.service.js";
import ghUserService from "../../services/gh.users.service.js";
import GithubUser from "../../dao/entities/Github.User.entity.js";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { githubCallbackUrl, githubClienteId, githubClientSecret, JWT_PRIVATE_KEY } from "../../configs/auth.config.js";
import { AuthenticationFailed } from "../../errors/Authentication.failed.js";
import { Strategy as LocalStrategy } from "passport-local";
import encryptedPass from "../../utils/password/encrypted.pass.js";
import { Strategy as GithubStrategy } from "passport-github2";
import authenticationService from "../../services/auth.service.js";


passport.use('register', new LocalStrategy({ passReqToCallback: true , usernameField: 'email'}, async (req, _u, _p, done) => {

    const { first_name, last_name, email, age, password } = req.body

    const exist = await usersService.getUserByQuery({ email: email })

    console.log(exist)

    if(exist.length > 0){
        return new Error("User already exists")
    }
    
    const user = await usersService.saveUser({ first_name, last_name, email, age, password })

    done(null, user)
}));


passport.use('login', new LocalStrategy({ usernameField: 'email' }, async ( username, password, done ) => {

    if(username === "adminCoder@coder.com" && password === "adminCod3r123"){
        console.log('Es usuario admin')
        const userAdmin = {
            username: 'User Admin',
            email: 'adminCoder@coder.com',
            role: 'Admin'
        }

        return done(null, userAdmin)
    }
    
    const user = authenticationService.login(username, password)

    return done(null, user)
}));


//GH
passport.use('github', new GithubStrategy({
    
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl

}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)

    //const exist = await ghUserService.getUserByQuery({ username: profile.username })
    /*     if(exist.length > 0){
        const user = exist[0]
        return done(null, user)
    } */
    
    let user

    try {
        user = await usersService.getUserByQuery({ username: profile.username })
    } catch (error) {
        
        user = new GithubUser({
            full_name: profile.displayName,
            user_id: profile.id,
            username: profile.username
        })
        await ghUserService.saveUser(user)
    }

    done(null, user)
}));


//JWT
passport.use('jwt', new jwtStrategy({

    jwtFromRequest: ExtractJwt.fromExtractors([
        function (req) {
            let token = null
            if (req && req.signedCookies) {
                token = req.signedCookies['jwt_authorization']
            }
            return token
        }
    ]),
    secretOrKey: JWT_PRIVATE_KEY

}, async (jwt_payload, done) => {
    try {
        done(null, jwt_payload)
    } catch (error) {
        done(error)
    }
}));

export function authenticationJwtView(req, res, next) {
    passport.authenticate('jwt', (error, user) => {

        if (error || !user) return res.redirect('/web/login')
        req.user = user
        next()
    })(req, res, next)
};

export function authenticationJwtApi(req, res, next) {
    
    passport.authenticate('jwt', (error, user) => {
        if (error || !user) return next(new AuthenticationFailed())
        req.user = user
        next()
    })(req, res, next)
};
//

export const passportInitialize = passport.initialize();

//
export const registerAuthentication = passport.authenticate('register', { session: false, failWithError: true })
export const loginAuthentication = passport.authenticate('login', { session: false, failWithError: true })
export const authenticationByGithub = passport.authenticate('github', { session: false, scope: ['user:email'] })
export const authenticationByGithub_CB = passport.authenticate('github', { session: false, failWithError: true })