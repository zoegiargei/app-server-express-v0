//import encryptedPass from "../../utils/password/encrypted.pass.js";

/* class User{
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
        if(!value){ throw new Error('Sent an invalidate first name') }
        this.#first_name = value
    }

    get last_name(){return this.#last_name}
    set last_name(value){
        if(!value){ throw new Error('Sent an invalidate last name') }
        this.#last_name = value
    }

    get email(){return this.#email}
    set email(value){
        if(!value){ throw new Error('Sent an invalidate email') }
        this.#email = value
    }

    get age(){return this.#age}
    set age(value) {
        if(!value || value <= 0){ throw new Error('Sent an invalidate age') }
        this.#age = value
    }

    get password(){return this.#password}
    set password(value){
        if(!value || value === ''){ throw new Error('Sent an invalidate password') }
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
};

export default User; */

import encryptedPass from "../../utils/password/encrypted.pass.js";

class User{
    constructor({username=null, first_name, last_name, email, age, password, cart={}, role='User'}){

        if(!first_name){ throw new Error('Sent an invalidate first name') }
        if(!last_name){ throw new Error('Sent an invalidate last name') }
        if(!email){ throw new Error('Sent an invalidate email') }
        if(!age || age <= 0){ throw new Error('Sent an invalidate age') }
        if(!password || password === ''){ throw new Error('Sent an invalidate password') }

        this.username = username || (`${first_name}${last_name}`).toLowerCase()
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.age = age,
        this.password = encryptedPass.createHash(password),
        this.cart = cart,
        this.role = role
    }
};

export default User;