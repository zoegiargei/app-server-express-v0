class Regex{
    constructor(){
        this.onlyNumbers = /^[0-9]+$/,
        this.validateEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        this.textWithBlancks = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/,
        this.textNotBlancks = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/,
        this.strongPassword = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    }

    validation(regex, value){
        if( (regex).test(value) ){
            return value
        } else{
            throw new Error(`Invalidate value: ${value}`)
        }
    }
}

//strong password, example: "wMH432595@"

const regex = new Regex();
export default regex;