import encryptedJWT from '../../utils/jwt/encrypted.jwt.js'

export async function contrLogin (req, res) {
    const payload = req.user
    res.cookie('jwt_authorization', encryptedJWT.encryptData(payload), {
        signed: true,
        httpOnly: true
    })
    req.logger.debug(String(req.user))
    res.sendAccepted({ message: 'User successfully logged in', object: req.user })
}

export async function contrLogout (req, res) {
    res.clearCookie('jwt_authorization', {
        signed: true,
        httpOnly: true
    })
    res.sendOk({ message: 'Successfully Logout', object: req.user })
}

export const contrPrivate = async (req, res) => {
    res.sendAccepted({ message: 'If you can see that, you are logged in' })
}

export const contrGetCurrent = async (req, res) => {
    req.logger.debug(String(req.user))
    res.redirect('/web/current')
}
