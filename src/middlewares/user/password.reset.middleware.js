import { AuthenticationFailed } from '../../errors/Authentication.failed.js'
import emailService from '../../services/emails.service.js'
import tokenService from '../../services/token.service.js'

export async function passwordResetMidd (req, res, next) {
    if (req.user) {
        const user = req.user
        req.logger.warn(user)
        const token = await tokenService.createToken(user._id)
        req.logger.warn(String(token))
        const tokenToUrl = token.token
        const resultSaveToken = await tokenService.saveTockenUpdatePass(user._id, token)
        req.logger.warn(resultSaveToken)

        const url = `http://localhost:8080/web/users/changePassword?token=${tokenToUrl}`
        const message = `
        <section>
            <h1>Do you want to reset your password?</h1>
            <h4>Click to the next button!</h4>
            <br>
            <a href=${url}>Reset password</a>
            <br>
        </section>
        `
        // email hardcodeado || real case: user.email
        await emailService.send('zoegiargei00@gmail.com', message)
        next()
    } else {
        next(new AuthenticationFailed())
    }
}
