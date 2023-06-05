/* eslint-disable object-shorthand */
import { Router } from 'express'
import { contrShowProducts } from '../../controllers/web/prod.web.controller.js'
import factory from '../../DAO/factory.js'
import { authenticationByRole } from '../../middlewares/authentication/authentication.byRole.js'
import { authenticationJwtWeb } from '../../middlewares/authentication/jwt/auth.byJwt.web.js'
import regex from '../../utils/regex/Regex.js'

const routerProductsWeb = Router()

routerProductsWeb.param('pid', async (req, res, next, pid) => {
    try {
        regex.validation(regex.num_letters_notCharacters, String(pid))
        next()
    } catch (error) {
        next(error)
    }
})

routerProductsWeb.get('/products', authenticationJwtWeb, contrShowProducts)
routerProductsWeb.get('/addProduct', authenticationJwtWeb, authenticationByRole(['Admin']), (req, res) => {
    const loggedin = req.user
    res.render('addProduct', { title: 'AddProduct', loggedin: loggedin })
})

/* routerProductsWeb.post('/product/:pid', authenticationJwtWeb, async (req, res) => {
    res.sendStatus(200)
})

routerProductsWeb.get('/productDetails/:pid', authenticationJwtWeb, authenticationByRole(['Admin', 'User']), async (req, res) => {
    try {
        const loggedin = req.user
        const pid = req.params.pid
        const product = await factory.productsService.getProductById(pid)
        const cid = req.user.cart[0]._id
        req.logger.debug(`>>>> value of CID of req.user.cart[0]._id: ${cid}`)

        res.render('product', { title: 'Details of product', loggedin: loggedin, product: product, cartId: cid, stock: product.stock })
    } catch (error) {
        res.sendClientError(error)
    }
}) */

// Diferent way

routerProductsWeb.post('/product', authenticationJwtWeb, (req, res) => {
    console.log(req.body.pid)
    // res.sendOk({ message: 'PID validado', object: req.body.pid })
    res.redirect(`/web/products/productProof/${req.body.pid}`)
})

/* routerProductsWeb.get('/productProof/:pid', authenticationJwtWeb, async (req, res) => {
    try {
        console.log('llego hasta aca')
        console.log(req.params.pid)
        const loggedin = req.user
        const cid = req.user.cart[0]._id
        const product = await factory.productsService.getProductById(req.params.pid)
        console.log(product)
        res.render('product', { title: 'Details of product', loggedin: loggedin, product: product, cartId: cid, stock: product.stock })
    } catch (error) {
        console.log(error)
    }
}) */

routerProductsWeb.get('/productProof/:pid', authenticationJwtWeb, async (req, res) => {
    console.log('llego hasta aca')
    console.log(req.params.pid)
    const loggedin = req.user
    const cid = req.user.cart[0]._id
    const product = await factory.productsService.getProductById(req.params.pid)
    console.log(product)
    res.render('product', { title: 'Details of product', loggedin: loggedin, product: product, cartId: cid, stock: product.stock })
})

export default routerProductsWeb
