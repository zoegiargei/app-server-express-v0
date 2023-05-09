import { Router } from "express";
import { contrDelProd, contrGetProd, contrGetProducts, contrPostProd, contrPutProd } from "../../controllers/api/products.controller.js";
import { authenticationByRole } from "../../middlewares/authentication/authentication.byRole.js";
import { authenticationJwtApi } from "../../middlewares/authentication/jwt/auth.byJwt.api.js";
import ConfigMulter from "../../utils/multer/config.files.multer.js";

const configMulter = new ConfigMulter('./public/uploads/thumbnails');
const upload = configMulter.configUpload();

const routerProducts = Router();

routerProducts.get('/:pid', contrGetProd)

routerProducts.get('/', contrGetProducts)

routerProducts.post('/addProduct', authenticationJwtApi, authenticationByRole(['Auth']), upload.single('file_thumbnail'), contrPostProd)

routerProducts.put('/:pid', contrPutProd)

routerProducts.delete('/:pid', contrDelProd)

export default routerProducts;
