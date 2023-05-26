import encryptedPass from '../../src/utils/password/encrypted.pass.js'
import regex from '../../src/utils/regex/Regex.js'

class User{
    #_id
    #username
    #first_name
    #last_name
    #email
    #age
    #password
    #role
    
    constructor({ _id=null, username=null, first_name, last_name, email, age, password, cart={}, role='User'}){

        this.#_id = _id
        this.#username = username || (`${first_name}${last_name}`).toLowerCase()
        this.#first_name = first_name,
        this.#last_name = last_name,
        this.#email = email,
        this.#age = age,
        this.#password = password
        this.cart = cart,
        this.#role = role
    }

    get _id(){return this.#_id}

    get username(){return this.#username}
    set username(value){
        this.#username = value
    }

    get first_name(){return this.#first_name}
    set first_name(value){
        value = regex.validation(regex.textNotBlanck, value)
        this.#first_name = value
    }

    get last_name(){return this.#last_name}
    set last_name(value){
        value = regex.validation(regex.textNotBlanck, value)
        this.#last_name = value
    }

    get email(){return this.#email}
    set email(value){
        value = regex.validation(regex.validateEmail, value)
        this.#email = value
    }

    get age(){return this.#age}
    set age(value) {
        value = regex.validation(regex.onlyNumbers, value)
        this.#age = value
    }

    get password(){return this.#password}
    set password(value){
        
        value = regex.validation(regex.strongPassword, value)
        const password = encryptedPass.createHash(value)
        this.#password = password
    }

    get role(){return this.#role}

    toDto(){
        return{
            _id: this.#_id,
            username: this.#username,
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            age: this.#age,
            password: this.#password,
            cart: this.cart,
            role: this.#role
        }
    }
}

export default User