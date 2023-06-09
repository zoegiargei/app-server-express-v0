/* eslint-disable camelcase */
import { errorsModel } from '../models/Errors.js'

class GithubUser {
    constructor ({ full_name, user_id, username, cart = {}, role = 'User' }) {
        if (!full_name) errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, `Sent an invalid argument: ${full_name}`)
        if (!user_id) errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, `Sent an invalid argument: ${user_id}`)
        if (!username) errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, `Sent an invalid argument: ${username}`)

        this.full_name = full_name
        this.user_id = user_id
        this.username = username
        this.cart = cart
        this.role = role
        this.orders = []
    }
}
export default GithubUser
