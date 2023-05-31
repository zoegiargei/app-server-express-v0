import { Router } from 'express'
import { authenticationJwtWeb } from '../../middlewares/authentication/jwt/auth.byJwt.web.js'
import routerCartsWeb from './router.carts.web.js'
import routerChatWeb from './router.chat.web.js'
import routerErrorWeb from './router.error.web.js'
import routerProductsWeb from './router.products.web.js'
import routerSessionWeb from './router.session.web.js'
import routerUsersWeb from './router.users.web.js'

const routerWeb = Router()

routerWeb.get('/', (req, res) => {
    res.redirect('/web/home')
})

routerWeb.get('/home', authenticationJwtWeb, (req, res) => {
    const loggedin = req.user
    res.render('home', { title: 'Home', loggedin })
})

routerWeb.use('/session', routerSessionWeb)
routerWeb.use('/products', routerProductsWeb)
routerWeb.use('/chat', routerChatWeb)
routerWeb.use('/error', routerErrorWeb)
routerWeb.use('/users', routerUsersWeb)
routerWeb.use('/carts', routerCartsWeb)

// proof
routerWeb.get('/upload', (req, res) => {
    res.render('upload', { title: 'Upload by Multer proof' })
})

export default routerWeb
