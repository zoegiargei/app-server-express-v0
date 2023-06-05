import { Router } from 'express'
import { contrGetUsers, contrRegister, contrChangePassword, contrConfirmSentEmail } from '../../controllers/api/users.controller.js'
import { authenticationByRole } from '../../middlewares/authentication/authentication.byRole.js'
import { authenticationJwtApi } from '../../middlewares/authentication/jwt/auth.byJwt.api.js'
import { registerAuthentication } from '../../middlewares/passport/passport.strategies.js'
import { passwordResetMidd } from '../../middlewares/user/password.reset.middleware.js'
import authTokenResetPass from '../../middlewares/user/token.reset.pass.middleware.js'
const routerUser = Router()

routerUser.post('/register', registerAuthentication, contrRegister)
routerUser.get('/users', authenticationJwtApi, authenticationByRole(['Admin']), contrGetUsers)
routerUser.post('/passwordReset', authenticationJwtApi, passwordResetMidd, contrConfirmSentEmail)
routerUser.post('/changePassword', authenticationJwtApi, authTokenResetPass, contrChangePassword)

export default routerUser
