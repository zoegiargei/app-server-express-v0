import usersService from '../../services/users.service.js'
import encryptedJWT from '../../utils/jwt/encrypted.jwt.js'

export async function contrRegister (req, res) {
    res.cookie('jwt_authorization', encryptedJWT.encryptData(req.user), {
        signed: true,
        httpOnly: true
    })
    req.logger.debug(String(req.user))
    res.sendOk({ message: 'Successfully registration', object: req.user })
}

export async function contrGetUsers (req, res, next) {
    const users = await usersService.getUsers()
    res.sendOk({ message: 'All users', object: users })
}
