import encryptedJWT from "../../utils/jwt/encrypted.jwt.js";

export function contrLoggedIn (req, res, next) {
    console.log('controller logged in')
    console.log(req.user)
    res.cookie('jwt_authorization', encryptedJWT.encryptData(req.user), { signed:true, httpOnly:true })
    res.redirect('/web/session/')
};
