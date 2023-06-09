import cartsService from './carts.service.js'
import factory from '../DAO/factory.js'
import encryptedPass from '../utils/password/encrypted.pass.js'
import { errorsModel } from '../models/Errors.js'
import { winstonLogger } from '../middlewares/loggers/logger.js'
// import emailService from './emails.service.js'

class UsersService {
    constructor (userRepository) {
        this.userRepository = userRepository
    }

    async saveUser (dataUser) {
        await cartsService.createCart(dataUser.email)
        const cid = await cartsService.getLastOne()

        dataUser = { ...dataUser, cart: cid }
        const user = this.userRepository.createUser(dataUser)
        return user
    }

    async getUserById (id) {
        return await this.userRepository.getOneById(id)
    }

    async getUserByQuery (query) {
        return await this.userRepository.getUserByQuery(query)
    }

    async getUsers () {
        return await this.userRepository.getAllUsers()
    }

    async getAField (param1, param2) {
        return await this.userRepository.findElementByProjection(param1, param2)
    }

    async updateUser (id, newUser) {
        return await this.userRepository.updateUser(id, newUser)
    }

    async updatePassword (id, currentPass, newPass) {
        const user = await this.getUserById(id)
        const isValidCurrentPassword = encryptedPass.isValidPassword(user.password, currentPass)
        winstonLogger.warn(isValidCurrentPassword)
        if (isValidCurrentPassword === false) return errorsModel.throwOneError(errorsModel.AUTH_FAILED, 'The current password is wrong')
        const isValidNewPassword = encryptedPass.isValidPassword(user.password, newPass)
        if (isValidNewPassword) return errorsModel.throwOneError(errorsModel.INVALID_REQ_ERROR, 'The new password cannot be equal to the current password')

        const newPassEncrypted = encryptedPass.createHash(newPass)
        const response = await this.userRepository.updateUser(id, { ...user, password: newPassEncrypted })
        winstonLogger.warn(response)
        return response
    }

    async deleteUser (id) {
        const user = this.userRepository.getOneById(id)
        const cid = user.cart._id
        await cartsService.deleteCart(cid)
        return await this.userRepository.deleteUser(id)
    }
}
const usersService = new UsersService(factory.userRepository)
export default usersService
