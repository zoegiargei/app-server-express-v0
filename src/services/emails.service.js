import { createTransport } from 'nodemailer'
import config from '../../config.js'
import { winstonLogger } from '../middlewares/loggers/logger.js'
import { errorsModel } from '../models/Errors.js'

class EmailsService {
    constructor (userNodemailer, passNodemailer) {
        this.clientNodemailer = createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: userNodemailer,
                pass: passNodemailer
            }
        })
    }

    async send (addressee, messsage) {
        const mailOptions = {
            from: 'server-app-giargei',
            to: addressee,
            subject: 'Receipt of your purchase in server-app-giargei store',
            html: messsage
        }

        try {
            const data = await this.clientNodemailer.sendMail(mailOptions)
            winstonLogger.debug(data)
            return (data)
        } catch (error) {
            return errorsModel.throwOneError(errorsModel.INTERNAL_ERROR, 'Something was wrong in nodemailer service')
        }
    }
}
const emailService = new EmailsService(config.USER_NODEMAILER, config.PASS_NODEMAILER)
export default emailService
