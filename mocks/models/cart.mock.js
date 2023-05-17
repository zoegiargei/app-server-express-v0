class CartMock{
    #userEmail

    constructor(userEmail){
        this.productsCart = [],
        this.#userEmail = userEmail
    }

    get userEmail(){ return this.#userEmail }
    
};