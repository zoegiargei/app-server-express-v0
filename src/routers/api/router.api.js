import { Router } from 'express'
import routerSession from './router.session.js'
import routerUser from './router.user.js'
import routerProducts from './router.products.js'
import routerCarts from './router.carts.js'
import { authenticationJwtApi } from '../../middlewares/authentication/jwt/auth.byJwt.api.js'
import { authenticationByRole } from '../../middlewares/authentication/authentication.byRole.js'

const routerApi = Router()

routerApi.use('/session', routerSession)
routerApi.use('/user', routerUser)
routerApi.use('/products', authenticationJwtApi, routerProducts)
routerApi.use('/carts', authenticationJwtApi, authenticationByRole(['Admin', 'User']), routerCarts)

export default routerApi
