import { errorsModel } from '../../models/Errors.js'
import emailService from '../../services/emails.service.js'
import tokenService from '../../services/token.service.js'
import templatesForEmails from '../../utils/templates/templates.send.email.js'

export async function passwordResetMidd (req, res, next) {
    if (req.user) {
        const user = req.user
        const token = await tokenService.createToken(user._id)
        const tokenToUrl = token.token
        const resultSaveToken = await tokenService.saveTockenUpdatePass(user._id, token)
        req.logger.warn(resultSaveToken)

        const url = `http://localhost:8080/web/users/changePassword?token=${tokenToUrl}`
        const message = templatesForEmails.templateEmailResetPass(url, user.username)
        // email hardcodeado || real case: user.email
        await emailService.send('zoegiargei00@gmail.com', message)
        next()
    } else {
        next(errorsModel.throwOneError(errorsModel.AUTH_FAILED, 'You are not authenticated'))
    }
}
