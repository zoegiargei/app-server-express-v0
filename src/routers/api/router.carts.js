import { Router } from 'express'
import { handlerDeleteCart, handlerDeleteProduct, handlerGetCart, handlerNewCart, handlerProductInCart, handlerPurchase, handlerShowCart, handlerUpdateCart, handlerUpdateQuantity } from '../../controllers/api/carts.controller.js'

import regex from '../../utils/regex/Regex.js'

const routerCarts = Router()

routerCarts.param('cid', async (req, res, next, cid) => {
    if (regex.validation(regex.num_letters_notCharacters, String(cid))) {
        next()
    }
})

routerCarts.param('pid', async (req, res, next, pid) => {
    if (regex.validation(regex.num_letters_notCharacters, pid)) {
        next()
    } else {
        req.params.pid = null
    }
    next()
})

routerCarts.get('/:cid', handlerGetCart)

routerCarts.post('/', handlerNewCart)

routerCarts.post('/:cid/products/:pid', handlerProductInCart)

routerCarts.post('/:cid/purchase', handlerPurchase)

routerCarts.post('/cartById', handlerShowCart)

routerCarts.put('/:cid/products/:pid', handlerUpdateQuantity)

routerCarts.put('/:cid', handlerUpdateCart)

routerCarts.delete('/:cid/products/:pid', handlerDeleteProduct)

routerCarts.delete('/:cid', handlerDeleteCart)

export default routerCarts
