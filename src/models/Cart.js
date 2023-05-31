import regex from '../utils/regex/Regex.js'

class Cart {
    constructor (userEmail) {
        this.productsCart = []
        this.userEmail = regex.validation(regex.validateEmail, userEmail)
    }
}
export default Cart
