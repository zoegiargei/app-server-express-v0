import { createTransport } from "nodemailer";
import config from "../../config.js";

class EmailsService{

    constructor(userNodemailer, passNodemailer){
        this.clientNodemailer = createTransport({
            service: 'gmail',
            port: 587,
            auth:{
                user: userNodemailer,
                pass: passNodemailer
            }
        })
    }

    async send(addressee, messsage){
        const mailOptions = {
            from: 'server-app-giargei',
            to: addressee,
            subject: 'Receipt of your purchase in server-app-giargei store',
            html: messsage
        }

        try {

            const data = await this.clientNodemailer.sendMail(mailOptions)
            console.log(data)
            return(data)

        } catch (error) {
            
            console.log(error)
            throw new Error(error)
        }
    }
};

const emailService = new EmailsService(config.USER_NODEMAILER, config.PASS_NODEMAILER);
export default emailService;