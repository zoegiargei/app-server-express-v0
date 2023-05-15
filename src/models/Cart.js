import regex from "../utils/regex/Regex.js";

class Cart{
    constructor(_id=null, userEmail){
        this._id = _id
        this.productsCart = [],
        this.userEmail = regex.validation(regex.validateEmail, userEmail)
    }
};

export default Cart;