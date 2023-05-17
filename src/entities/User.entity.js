import encryptedPass from "../utils/password/encrypted.pass.js"

class User{
    constructor({ username=null, first_name, last_name, email, age, password, cart={}, role='User' }){

        if(!first_name){ return new Error('Sent an invalidate first name') }
        if(!last_name){ return new Error('Sent an invalidate last name') }
        if(!email){ return new Error('Sent an invalidate email') }
        if(!age || age <= 0){ return new Error('Sent an invalidate age') }
        if(!password || password === ''){ return new Error('Sent an invalidate password') }

        this.username = username || (`${first_name}${last_name}`).toLowerCase()
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.age = age,
        this.password = encryptedPass.createHash(password),
        this.cart = cart,
        this.role = role,
        this.orders = []
    }

    toDto(){
        return{
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            age: this.age,
            password: this.password,
            cart: this.cart,
            role: this.role,
            orders: this.orders
        }
    }
};

export default User;