import usersService from "../../services/users.service.js"
import encryptedJWT from "../../utils/jwt/encrypted.jwt.js"

export async function contrLogin (req, res, next){

    res.cookie('jwt_authorization', encryptedJWT.encryptData(req.user), {
        signed: true,
        httpOnly: true
    })
    res.status(201).json(req.user)
};


export async function contrLogout (req, res, next) {

    res.clearCookie('jwt_authorization', {
        signed: true,
        httpOnly: true
    })
    res.sendStatus(200)
};


export const contrPrivate = async (req, res) => {
    
    console.log(req.user)
    res.send("Si ves esto es por que estas logeado.")
};


export const contrGetCurrent = async (req, res) => {
    
    res.redirect('/web/current')
    res.json(req.user)
};