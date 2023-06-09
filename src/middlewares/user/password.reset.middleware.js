import { errorsModel } from '../../models/Errors.js'
import emailService from '../../services/emails.service.js'
import tokenService from '../../services/token.service.js'

export async function passwordResetMidd (req, res, next) {
    if (req.user) {
        const user = req.user
        const token = await tokenService.createToken(user._id)
        const tokenToUrl = token.token
        const resultSaveToken = await tokenService.saveTockenUpdatePass(user._id, token)
        req.logger.warn(resultSaveToken)

        const url = `http://localhost:8080/web/users/changePassword?token=${tokenToUrl}`
        const message = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
            </head>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                    <tr>
                    <td style="padding: 20px;">
                        <h1 style="text-align: start; margin: auto;">Password Reset</h1>
                        <p>Hello ${user.username},</p>
                        <p>We have received a request to reset the password for your account. Click the following link to proceed with the reset:</p>
                        <p><a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Reset Password</a></p>
                        <p>If you didn't request a password reset, you can ignore this email.</p>
                        <p>Regards,</p>
                        <p>Your application team</p>
                    </td>
                    </tr>
                </table>
            </body>
            </html>
        `
        // email hardcodeado || real case: user.email
        await emailService.send('zoegiargei00@gmail.com', message)
        next()
    } else {
        next(errorsModel.throwOneError(errorsModel.AUTH_FAILED, 'You are not authenticated'))
    }
}
