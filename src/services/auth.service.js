import { AuthenticationFailed } from '../errors/Authentication.failed.js'
import { winstonLogger } from '../utils/loggers/logger.js'
import encryptedPass from '../utils/password/encrypted.pass.js'
import usersService from './users.service.js'

class AuthenticationService {
    constructor (usersService, encryptedPassword, AuthenticationError) {
        this.usersService = usersService
        this.encryptedPassword = encryptedPassword
        this.AuthenticationError = AuthenticationError
    }

    async login (userEmail, password) {
        const user = await this.usersService.getUserByQuery({ email: userEmail })

        if (!user || user.length === 0) {
            winstonLogger.warn('User not existing')
            return this.AuthenticationError()
        }
        const isValidatePassword = this.encryptedPassword.isValidPassword(user[0].password, password)
        if (!isValidatePassword) {
            return new this.AuthenticationError()
        }

        const userToSend = user[0]
        return userToSend
    }
}

const authenticationService = new AuthenticationService(usersService, encryptedPass, new AuthenticationFailed())
export default authenticationService
