import { Router } from "express";
import routerSession from "./router.session.js";
import routerUser from "./router.user.js";
import routerProducts from "./router.products.js";
import routerCarts from "./router.carts.js";
import ConfigMulter from "../../utils/multer/config.files.multer.js";
import { authenticationJwtApi } from "../../middlewares/authentication/jwt/auth.byJwt.api.js";
import { authenticationByRole } from "../../middlewares/authentication/authentication.byRole.js";

const configMulter = new ConfigMulter('./public/uploads')
const upload = configMulter.configUpload()

const routerApi = Router();

routerApi.use('/session', routerSession);
routerApi.use('/user', routerUser);
routerApi.use('/products', routerProducts);
routerApi.use('/carts', authenticationJwtApi, authenticationByRole(['Admin','User']), routerCarts);

//proof
routerApi.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file)
    res.send("Image Uploaded")
});

export default routerApi;