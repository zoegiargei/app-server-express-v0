import twilio from 'twilio'
import config from '../../config.js'

class SmsService{
    constructor(accountSid, authToken){
        this.twilioClient = twilio(accountSid, authToken)
    }

    async sendSms(addressee, message){
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

            console.log(error)
            return new Error(error)
        }
    }
}

const smsService = new SmsService(config.ACCOUNT_SID_TWILIO, config.AUTH_TOKEN_TWILIO)
export default smsService