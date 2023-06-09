import { errorsModel } from '../../models/Errors.js'
import encryptedJWT from '../../utils/jwt/encrypted.jwt.js'

export async function contrLogin (req, res, next) {
    try {
        const payload = req.user
        const ttl = '2h'
        res.cookie('jwt_authorization', encryptedJWT.encryptData(payload, ttl), {
            signed: true,
            httpOnly: true
        })
        const userToShow = req.user
        delete userToShow.password
        res.sendAccepted({ message: 'User successfully logged in', object: userToShow })
    } catch (error) {
        next(error)
    }
}

export async function contrLogout (req, res, next) {
    try {
        res.clearCookie('jwt_authorization', {
            signed: true,
            httpOnly: true
        })
        res.sendOk({ message: 'Successfully Logout', object: req.user })
    } catch (error) {
        next(error)
    }
}

export const contrPrivate = async (req, res, next) => {
    try {
        if (req.user) {
            res.sendAccepted({ message: 'If you can see that, you are logged in' })
        } else {
            return errorsModel.throwOneError(errorsModel.AUTH_FAILED, 'You are not authenticated')
        }
    } catch (error) {
        next(error)
    }
}

export const contrGetCurrent = async (req, res, next) => {
    try {
        if (req.user) {
            req.logger.debug(req.user)
            res.sendOk({ message: 'You are logged in', object: req.user })
        } else {
            return errorsModel.throwOneError(errorsModel.AUTH_FAILED, 'You are not logged in')
        }
    } catch (error) {
        next(error)
    }
}
