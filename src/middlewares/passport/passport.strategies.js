/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import passport from 'passport'
import usersService from '../../services/users.service.js'
import ghUserService from '../../services/gh.users.service.js'
import GithubUser from '../../entities/Github.User.entity.js'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { githubCallbackUrl, githubClienteId, githubClientSecret, JWT_PRIVATE_KEY } from '../../configs/auth.config.js'
import { Strategy as LocalStrategy } from 'passport-local'
import encryptedPass from '../../utils/password/encrypted.pass.js'
import { Strategy as GithubStrategy } from 'passport-github2'
import config from '../../../config.js'
import cartsService from '../../services/carts.service.js'
import { winstonLogger } from '../loggers/logger.js'
import { errorsModel } from '../../models/Errors.js'

passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, _u, _p, done) => {
    const { first_name, last_name, email, age, password } = req.body

    const exist = await usersService.getUserByQuery({ email: email })

    winstonLogger.warn(`exist user?: (in register) ${exist}`)
    if (exist.length > 0) return done(errorsModel.throwOneError(errorsModel.INVALID_REQ_ERROR, 'User already exist'), null)
    const user = await usersService.saveUser({ first_name, last_name, email, age, password })

    done(null, user)
}))

passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    const adminEmail = config.ADMIN_EMAIL
    const adminPassword = config.ADMIN_PASSWORD
    if (username === adminEmail && password === adminPassword) {
        winstonLogger.debug('Is amdmin user')
        await cartsService.createCart(username)
        const cid = await cartsService.getLastOne()

        const userAdmin = {
            username: 'User Admin',
            email: 'adminCoder@coder.com',
            cart: cid,
            role: 'Admin',
            admin: true,
            orders: []
        }

        return done(null, userAdmin)
    }

    const user = await usersService.getUserByQuery({ email: username })

    if (!user || user.length === 0) {
        return done(errorsModel.throwOneError(errorsModel.AUTH_FAILED, 'One of the credentials is wrong'), null)
    }
    const isValidatePassword = encryptedPass.isValidPassword(user[0].password, password)
    winstonLogger.warn(`Esto es en la estrategia de passport: ${isValidatePassword}`)
    if (isValidatePassword === false) {
        return done(errorsModel.throwOneError(errorsModel.AUTH_FAILED, 'One of the credentials is wrong'), null)
    }
    const userToSend = user[0]
    done(null, userToSend)
}))

// GH
passport.use('github', new GithubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl

}, async (accessToken, refreshToken, profile, done) => {
    winstonLogger.debug(profile)
    const exist = await ghUserService.getUserByQuery({ username: profile.username })
    if (exist.length > 0) {
        return done(null, exist[0])
    }

    try {
        const user = new GithubUser({
            full_name: profile.displayName,
            user_id: profile.id,
            username: profile.username
        })

        await ghUserService.saveUser(user)
        return done(null, user)
    } catch (error) {
        return done(error, null)
    }
}))

// JWT
passport.use('jwt', new JwtStrategy({

    jwtFromRequest: ExtractJwt.fromExtractors([
        function (req) {
            let token = null
            if (req && req.signedCookies) {
                token = req.signedCookies.jwt_authorization
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
}))
//

export const passportInitialize = passport.initialize()

//
export const registerAuthentication = passport.authenticate('register', { session: false, failWithError: true })
export const loginAuthentication = passport.authenticate('login', { session: false, failWithError: true })
export const authenticationByGithub = passport.authenticate('github', { session: false, scope: ['user:email'] })
export const authenticationByGithub_CB = passport.authenticate('github', { session: false, failWithError: true })
