import { classErrors } from '../errors/Errors.js'

class GithubUser{
    constructor({ full_name, user_id, username, cart={}, role='User' }){

        //Faltan validaciones con regex
        if(!full_name){ return new Error(classErrors.throwOneError(classErrors.ERROR_INVALID_ARGUMENT, 'Sent an invalidate full name')) }
        if(!user_id){ return new Error(classErrors.throwOneError(classErrors.ERROR_INVALID_ARGUMENT, 'Sent an invalidate last name')) }
        if(!username){ return new Error(classErrors.throwOneError(classErrors.ERROR_INVALID_ARGUMENT, 'Sent an invalidate email'))}

        this.full_name = full_name,
        this.user_id = user_id,
        this.username = username,
        this.cart = cart,
        this.role = role,
        this.orders = []
    }
}

export default GithubUser