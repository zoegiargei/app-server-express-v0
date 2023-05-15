import { Router } from 'express';
import { contrDelAllProds, contrDelProdInCart, contrGetCart, contrPostCart, contrProdInCart, contrPutCart, contrPutProdInCart, handlerPurchase, handlerShowCart } from '../../controllers/api/carts.controller.js';
import { transport } from '../../main.js';
import { authenticationByRole } from '../../middlewares/authentication/authentication.byRole.js';
import { authenticationJwtApi } from '../../middlewares/authentication/jwt/auth.byJwt.api.js';

const routerCarts = Router();

//proof


routerCarts.get('/:cid', contrGetCart)

routerCarts.get('/email', authenticationJwtApi, async (req, res) => {

    let result = await transport.sendMail({
        from: 'server-app Zoe Giargei',
        to: 'zoegiargei00@gmail.com', //hardcodeado
        subject: 'Ticket de compra',
        html: `
            <div class="card text-center">
                
            <div class="card-header">
                    TICKET
                </div>

                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text"></p>
                </div>
                
                <div class="card-footer text-body-secondary">
                </div>
            </div>
        `,
        attachments: []
    })
    console.log('email enviado')

    res.status(201)
});

routerCarts.post('/', contrPostCart)

routerCarts.post('/:cid/products/:pid', contrProdInCart)

routerCarts.post('/:cid/purchase', authenticationJwtApi, authenticationByRole(['Admin', 'User']), handlerPurchase)

routerCarts.put('/:cid/products/:pid', authenticationJwtApi, authenticationByRole(['User']), contrPutProdInCart)

routerCarts.put('/:cid', contrPutCart)

routerCarts.delete('/:cid/products/:pid', contrDelProdInCart)

routerCarts.delete('/:cid', authenticationJwtApi, authenticationByRole(['Admin']), contrDelAllProds)

//proof
routerCarts.post('/cartById', handlerShowCart)

export default routerCarts;