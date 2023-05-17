class UserMock{
    
    #id
    #email
    #username
    #first_name
    #cart

    constructor({ id, username, email, first_name, cart }){
        this.#id = id,
        this.#username = username,
        this.#email = email,
        this.#first_name = first_name,
        this.#cart = cart
    }

    get id(){ return this.#id }
    get email(){ return this.#email }

    set email(value){
        //validation
        const email = value
        this.#email = email
    }

    get username(){ return this.#username }
    get first_name(){ return this.#first_name }
    get cart(){ return this.#cart }

    toDto(){
        return{
            id: this.#id,
            emial: this.#email,
            first_name: this.#first_name,
            cart: this.#cart
        }
    }
};

export default UserMock;