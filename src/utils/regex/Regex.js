class Regex{
    constructor(){
        this.numbersBlanksAndText = /[A-Za-z0-9]+/g,
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
            console.log(String(regex))
            console.log(value)
            throw new Error(`Invalidate value: ${value}`)
        }
    }
}

//strong password, example: "wMH432595@"
const regex = new Regex();
export default regex;