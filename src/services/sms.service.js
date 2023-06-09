import twilio from 'twilio'
import config from '../../config.js'
import { errorsModel } from '../models/Errors.js'

class SmsService {
    constructor (accountSid, authToken) {
        this.twilioClient = twilio(accountSid, authToken)
    }

    async sendSms (addressee, message) {
        const smsOptions = {
            from: config.PHONE_NUMBER_TWILIO,
            to: addressee,
            body: message
        }

        try {
            const message = await this.twilioClient.messages.create(smsOptions)
            console.log(message)
            return message
        } catch (error) {
            return errorsModel.throwOneError(errorsModel.INTERNAL_ERROR, 'Something was wrong in messages service')
        }
    }
}

let smsService
if (config.NODE_ENV === 'PROD') {
    smsService = new SmsService(config.ACCOUNT_SID_TWILIO, config.AUTH_TOKEN_TWILIO)
} else {
    smsService = new SmsService(config.ACCOUNT_SID_TWILIO, config.AUTH_TOKEN_TWILIO)
}
export default smsService
