import usersService from '../../services/users.service.js'
import encryptedJWT from '../../utils/jwt/encrypted.jwt.js'

export async function contrRegister (req, res) {
    const ttl = '2h'
    res.cookie('jwt_authorization', encryptedJWT.encryptData(req.user, ttl), {
        signed: true,
        httpOnly: true
    })
    req.logger.debug(String(req.user))
    res.sendOk({ message: 'Successfully registration', object: req.user })
}

export async function contrGetUsers (req, res) {
    const users = await usersService.getUsers()
    res.sendOk({ message: 'All users', object: users })
}

export async function contrConfirmSentEmail (req, res) {
    const email = req.user.email
    res.sendOk({ message: 'Password reset email sent to the client', object: email })
}

export async function contrChangePassword (req, res) {
    req.logger.warn('Llego hasta controller change password')
    res.sendOk({ message: 'changed your password', object: {} })
}
