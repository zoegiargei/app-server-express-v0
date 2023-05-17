import { Router } from 'express';
import { handlerDeleteCart, handlerDeleteProduct, handlerDeleteProducts, handlerGetCart, handlerNewCart, handlerProductInCart, handlerPurchase, handlerShowCart, handlerUpdateCart, handlerUpdateQuantity } from '../../controllers/api/carts.controller.js';
import cartsService from '../../services/carts.service.js';

const routerCarts = Router();

routerCarts.get('/:cid', handlerGetCart)

routerCarts.post('/', handlerNewCart)

routerCarts.post('/:cid/products/:pid', handlerProductInCart)

routerCarts.post('/:cid/purchase', handlerPurchase)

routerCarts.post('/cartById', handlerShowCart)

routerCarts.put('/:cid/products/:pid', handlerUpdateQuantity)

routerCarts.put('/:cid', handlerUpdateCart)

routerCarts.delete('/:cid/products/:pid', handlerDeleteProduct)

routerCarts.delete('/:cid', handlerDeleteCart)


export default routerCarts;