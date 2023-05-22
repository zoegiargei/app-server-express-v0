import { classErrors } from "../../errors/Errors.js"

class Regex{
    constructor(){
        this.num_letters_notCharacters = /^[a-zA-Z0-9]+$/,
        this.numbersBlanksAndText = /^[a-zA-Z0-9\s]+$/,
        this.onlyNumbers = /^[0-9]+$/,
        this.validateEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        this.textWithBlancks = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/,
        this.textNotBlancks = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/,
        this.strongPassword = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
        this.validatePrice = /^[0-9]+([,|.][0-9]+)?$/
    }

    validation(regex, value){
        if((regex).test(value) ){
            return value
        } else{
            throw new Error( classErrors.throwOneError(classErrors.ERROR_INVALID_ARGUMENT, "The validation regex return failed") )
        }
    }
}

//strong password, example: "wMH432595@"
const regex = new Regex();
export default regex;