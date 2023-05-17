import express from 'express';
import routerCartsMock from './routers/cart.router.mock.js';

const apiMock = express();

apiMock.use(express.json());
apiMock.use(express.urlencoded({ extended:true }));

apiMock.use('/carts', routerCartsMock);
