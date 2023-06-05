/* eslint-disable object-shorthand */
import { Router } from 'express'
import { authenticationJwtWeb } from '../../middlewares/authentication/jwt/auth.byJwt.web.js'
import { authenticationByRole } from '../../middlewares/authentication/authentication.byRole.js'
import { contrShowUsers } from '../../controllers/web/users.web.controller.js'
import { authTokenResetPass } from '../../middlewares/user/token.reset.pass.middleware.js'

const routerUsersWeb = Router()

routerUsersWeb.get('/', authenticationJwtWeb, authenticationByRole(['Admin']), contrShowUsers)
routerUsersWeb.get('/passwordReset', authenticationJwtWeb, (req, res) => {
    res.render('passwordReset', { title: 'Reset your password', loggedin: req.user })
})
routerUsersWeb.get('/sentEmailResetPass', authenticationJwtWeb, async (req, res) => {
    const loggedin = req.user
    res.render('sentEmailResetPass', { title: 'Sent Email Reset your Password', loggedin: loggedin })
})
routerUsersWeb.get('/changePassword', authenticationJwtWeb, authTokenResetPass, (req, res) => {
    const loggedin = req.user
    const token = req.query.token
    console.log(token)
    res.render('changePassword', { title: 'Change Here your password', loggedin: loggedin })
})

export default routerUsersWeb
