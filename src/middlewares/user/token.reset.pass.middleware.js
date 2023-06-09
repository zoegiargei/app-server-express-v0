import { errorsModel } from '../../models/Errors.js'
import tokenService from '../../services/token.service.js'

export async function authTokenResetPass (req, res, next) {
    const token = req.query.token
    if (token) {
        // const tokenInDb = await tokenService.getTokenByUserId(req.user._id)
        const tokenByToken = await tokenService.validateEqualsTokens(token)
        if (tokenByToken) {
            console.log('token aun existe')
        }
        next()
    } else {
        next(errorsModel.throwOneError(errorsModel.PERMISSIONS_FAILED, 'Expired token'))
    }
}
export default authTokenResetPass
