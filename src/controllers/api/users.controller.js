import usersService from "../../services/users.service.js";
import encryptedJWT from "../../utils/jwt/encrypted.jwt.js";

export async function contrRegister (req, res, next){

    res.cookie('jwt_authorization', encryptedJWT.encryptData(req.user), {
        signed: true,
        httpOnly: true
    })
    
    res.status(201).json(req.user)
};

export async function contrGetUsers(req, res, next) {

    const users = await usersService.getUsers()
    res.json(users)
    //.redirect('/web/users/')
};