/* eslint-disable camelcase */
import { Router } from 'express'
import { contrLogin, contrLogout, contrGetCurrent } from '../../controllers/api/sessions.controller.js'
import { authenticationByGithub, authenticationByGithub_CB, loginAuthentication } from '../../middlewares/passport/passport.strategies.js'
import { authenticationJwtApi } from '../../middlewares/authentication/jwt/auth.byJwt.api.js'
import { contrLoggedIn } from '../../controllers/web/sess.web.controller.js'
import { body, matchedData, validationResult, check } from 'express-validator'

const routerSession = Router()

export function validatorCredentials (req, res, next) {
    const { email, password } = matchedData(req)
    console.dir(`That is matched data: ${email} ${password}`)
    const errors = validationResult(req)
    if (errors.length) return next(errors)
    next()
}
export async function validationWithCheck (req, res, next) {
    const fieldEmail = await check('email').notEmpty().isEmail().run(req)
    const fieldPassword = await check('password').notEmpty().run(req)
    console.log(fieldEmail)
    console.log(fieldPassword)
    const errors = validationResult(req)
    if (errors.length) return next(errors)
    next()
}

// proof of express validator
routerSession.post('/login', body('email').isEmail(), body('password'), validatorCredentials, validationWithCheck, loginAuthentication, contrLogin)
routerSession.get('/github', authenticationByGithub, contrLogin)
routerSession.get('/githubcallback', authenticationByGithub_CB, contrLoggedIn)
routerSession.get('/current', authenticationJwtApi, contrGetCurrent)
routerSession.post('/logout', authenticationJwtApi, contrLogout)

export default routerSession
