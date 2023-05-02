import encryptedJWT from "../../utils/jwt/encrypted.jwt.js";

export function contrLoggedIn (req, res, next) {
    res.cookie('jwt_authorization', encryptedJWT.encryptData(req.user), { signed:true, httpOnly:true })
    console.log('controller logged in')
    console.log(req.user)
    res.redirect('/web/session/')
};
