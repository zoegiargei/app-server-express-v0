import encryptedJWT from "../../utils/jwt/encrypted.jwt.js";

export function contrLoggedIn (req, res, next) {
    res.cookie('jwt_authorization', encryptedJWT(req.user), { signed:true, httpOnly:true })
    res.redirect('/web/session/')
};
