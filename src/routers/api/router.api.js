import { Router } from "express";
import routerSession from "./router.session.js";
import routerUser from "./router.user.js";
import routerProducts from "./router.products.js";
import routerCarts from "./router.carts.js";
import ConfigMulter from "../../utils/multer/config.files.multer.js";
import { authenticationJwtApi } from "../../middlewares/authentication/jwt/auth.byJwt.api.js";
import { authenticationByRole } from "../../middlewares/authentication/authentication.byRole.js";
import cartsService from "../../services/carts.service.js";

const configMulter = new ConfigMulter('./public/uploads')
const upload = configMulter.configUpload()

const routerApi = Router();

routerApi.use('/session', routerSession);
routerApi.use('/user', routerUser);
routerApi.use('/products', authenticationJwtApi, routerProducts);
routerApi.use('/carts', authenticationJwtApi, authenticationByRole(['Admin','User']), routerCarts);

//proof
routerApi.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file)
    res.send("Image Uploaded")
});


//proof of currents responses
routerApi.post('/nuevoCarrito', async (req, res) => {
    try {
        
        //proof of query
        console.log(req.query)

        const userEmail = req.body

        const newCart = await cartsService.createCart(userEmail.email)

        res.sendCreated({ message: "Cart created successfully", object: newCart })

    } catch (error) {
        
        res.sendClientError(error)
    }
});

export default routerApi;