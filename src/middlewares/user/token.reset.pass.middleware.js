import { errorsModel } from '../../models/Errors.js'
import tokenService from '../../services/token.service.js'

export async function authTokenResetPass (req, res, next) {
    const token = req.query.token
    const tokenByToken = await tokenService.validateEqualsTokens(token)
    if (tokenByToken.length === 0) next(errorsModel.throwOneError(errorsModel.PERMISSIONS_FAILED, 'Expired token'))
    next()
}
export default authTokenResetPass
