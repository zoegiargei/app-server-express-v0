import encryptedPass from '../../src/utils/password/encrypted.pass.js'

/* eslint-disable camelcase */
class UserMock {
    #email
    #username
    #first_name
    #last_name
    #age
    #password
    #role
    #orders
    #cart
    constructor ({ username, email, first_name, last_name, age, password }) {
        this.#username = username || (`${first_name}${last_name}`).toLowerCase()
        this.#first_name = first_name
        this.#last_name = last_name
        this.#email = email
        this.#age = age
        this.#password = encryptedPass.createHash(password)
        this.#role = 'Admin'
        this.#orders = []
    }

    get username () { return this.#username }
    get first_name () { return this.#first_name }
    get last_name () { return this.#last_name }
    get email () { return this.#email }
    get age () { return this.#age }
    get password () { return this.#password }
    get cart () { return this.#cart }
    get role () { return this.#role }
    get orders () { return this.#orders }

    set email (value) {
        // validation
        const email = value
        this.#email = email
    }

    toDto () {
        return {
            username: this.#username,
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            age: this.#age,
            password: this.#password,
            role: this.#role,
            orders: this.#orders
        }
    }
}
export default UserMock
