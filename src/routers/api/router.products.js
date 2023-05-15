import { Router } from "express";
import { contrDelProd, contrGetProd, contrGetProducts, contrPostProd, contrPutProd } from "../../controllers/api/products.controller.js";
//import * as prodHandlers from "../../controllers/api/products.controller.js";
import { authenticationByRole } from "../../middlewares/authentication/authentication.byRole.js";
import { authenticationJwtApi } from "../../middlewares/authentication/jwt/auth.byJwt.api.js";
import ConfigMulter from "../../utils/multer/config.files.multer.js";

const configMulterProof = new ConfigMulter('./public/uploads/thumbnails');
const uploadAttach = configMulterProof.configUpload();

const routerProducts = Router();

routerProducts.get('/:pid', contrGetProd)

routerProducts.get('/', contrGetProducts)

routerProducts.post('/addProduct', authenticationJwtApi, authenticationByRole(['Admin']), uploadAttach.single('attach'), contrPostProd)

routerProducts.put('/:pid', contrPutProd)

routerProducts.delete('/:pid', contrDelProd)

export default routerProducts;
