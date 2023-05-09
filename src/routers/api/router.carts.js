import { Router } from 'express';
import { contrDelAllProds, contrDelProdInCart, contrGetCart, contrPostCart, contrProdInCart, contrPutCart, contrPutProdInCart, handlerShowCart } from '../../controllers/api/carts.controller.js';
import { authenticationByRole } from '../../middlewares/authentication/authentication.byRole.js';
import { authenticationJwtApi } from '../../middlewares/authentication/jwt/auth.byJwt.api.js';

const routerCarts = Router();

routerCarts.post('/', contrPostCart)

routerCarts.post('/:cid/products/:pid', contrProdInCart)

routerCarts.get('/:cid', contrGetCart)

routerCarts.put('/:cid/products/:pid', authenticationJwtApi, authenticationByRole(['User']), contrPutProdInCart)

routerCarts.put('/:cid', contrPutCart)

routerCarts.delete('/:cid/products/:pid', contrDelProdInCart)

routerCarts.delete('/:cid', authenticationJwtApi, authenticationByRole(['Admin']), contrDelAllProds)

//proof
routerCarts.post('/cartById', handlerShowCart)

export default routerCarts;