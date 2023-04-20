import { Router } from "express";
import passport from "passport";
import { contrGetUsers, contrRegister } from "../../controllers/api/users.controller.js";
import authenticationByRole from "../../middlewares/authentication/authentication.byRole.js";
import { registerAuthentication } from "../../middlewares/passport/passport.strategies.js";
const routerUser = Router();

routerUser.post('/register', registerAuthentication, contrRegister);

//proof
routerUser.get('/users', authenticationByRole(['Admin']), contrGetUsers);

export default routerUser;