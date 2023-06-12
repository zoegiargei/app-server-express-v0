import { errorsModel } from '../../Errors.js'
import { UserEmail, UserPassword } from './values.user.js'

export class User {
    #id
    #firstName
    #lastName
    #email
    #age
    #password
    #cart
    #role
    #orders

    #regexNames = /^[a-zA-Z]+$/
    #regexAge = /^(0?[1-9]|[1-9][0-9]|[1][01][0-9]|100)$/

    constructor (id = '', firstName, lastName, email, age, password, cart, role = 'User', orders) {
        this.#id = id
        this.#firstName = firstName
        this.#lastName = lastName
        this.#email = new UserEmail(email)
        this.#age = age
        this.#password = new UserPassword(password)
        this.#cart = cart
        this.#role = role
        this.#orders = []
    }

    get id () { return this.#id.value }
    get firstName () { return this.#firstName }
    get lastName () { return this.#lastName }
    get email () { return this.#email.value }
    get age () { return this.#age.value }
    get password () { return this.#password.value }
    get cart () { return this.#cart }
    get role () { return this.#role }
    get orders () { return this.#orders }

    ensureValueIsDefined (value) {
        if (typeof value !== 'string' || value === null || value === '') {
            errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'Value must be defined')
        }
    }

    set firstName (value) {
        this.ensureValueIsDefined(value)
        this.#firstName = this.#regexNames(value)
    }

    set lastName (value) {
        this.ensureValueIsDefined(value)
        this.#lastName = this.#regexNames(value)
    }

    set age (value) {
        this.ensureValueIsDefined(value)
        this.#age = this.#regexAge(value)
    }

    set password (value) {
        this.#password = new UserPassword(value)
    }

    set role (value) {
        this.ensureValueIsDefined(value)
        const roles = ['Admin', 'User', 'Premium']
        if (!roles.includes(value)) {
            errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, `${value} is not a valid Role`)
        }
        this.#role = value
    }

    toDto () {
        return {
            id: this.#id,
            firstName: this.#firstName,
            lastName: this.#lastName,
            email: this.#email,
            age: this.#age,
            password: this.#password,
            cart: this.#cart,
            role: this.#role,
            orders: this.#orders
        }
    }
}
