import { Router } from "express";
import { contrGetUsers, contrRegister } from "../../controllers/api/users.controller.js";
import { authenticationByRole } from "../../middlewares/authentication/authentication.byRole.js";
import { authenticationJwtApi } from "../../middlewares/authentication/jwt/auth.byJwt.api.js";
import { registerAuthentication } from "../../middlewares/passport/passport.strategies.js";
const routerUser = Router();

routerUser.post('/register', registerAuthentication, contrRegister);

//authentication by role proof
routerUser.get('/users', authenticationJwtApi, authenticationByRole(['Admin']), contrGetUsers);

export default routerUser;