class UserMock{
    constructor(id, email, name, cart){
        this.id = id,
        this.email = email,
        this.name = name,
        this.cart = cart
    }

    toDto(){
        return{
            id: this.id,
            emial: this.email,
            name: this.name,
            cart: this.cart
        }
    }
}