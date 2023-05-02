import { Router } from "express";
import { authenticationJwtWeb } from "../../middlewares/authentication/jwt/auth.byJwt.web.js";
import { authenticationByRole } from "../../middlewares/authentication/authentication.byRole.js";
import { contrShowUsers } from "../../controllers/web/users.web.controller.js";

const routerUsersWeb = Router();

routerUsersWeb.get('/', authenticationJwtWeb, authenticationByRole(['Admin']), contrShowUsers)

export default routerUsersWeb;