/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */
const rOnlyNumbers = /^[0-9]+$/

class Regex {
    constructor () {
        this.onlyNumbers = /^[0-9]+$/
        this.email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
        this.textWithBlancks = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/
        this.textNotBlancks = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/
        this.strongPassword = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/

    }

    numbers (value) {
        if ((this.onlyNumbers).test(value)) {
            return true
        } else {
            return false
        }
    }

    validateEmail (value) {
        if ((this.email).test(value)) {
            return true
        } else {
            return false
        }
    }

    textWithB (value) {
        if ((this.textWithBlancks).test(value)) {
            return true
        } else {
            return false
        }
    }

    textNotB (value) {
        if ((this.textNotBlancks).test(value)) {
            return true
        } else {
            return false
        }
    }

    // strong password, ejemplo: "wMH432595@" ,implementar con match: if( userPassword.match(r_strongPass)!=null )
    validateStrongPassword (value) {
        if ((this.strongPassword).test(value)) {
            return true
        } else {
            return false
        }
    }

    validation (regex, value) {
        if ((regex).test(value)) {
            return true
        } else {
            return false
        }
    }
}

const regex = new Regex()

const onlyNumbers = regex.numbers('1')
const email = regex.validateEmail('zoee@algo.ar')
const text = regex.textWithB('texto con espacios')
const textSinEspacios = regex.textNotB('estoessinespacios')
const password = regex.validateStrongPassword('abcd1234ABC_')

const validationMethod = regex.validation(regex.textNotBlancks, '') // Funciona

const validation = regex.validation(/[A-Za-z0-9]+/g, 'The Football Is Good For Training And Recreational Purposes')
const validation2 = regex.validation(/^[0-9]+([,|.][0-9]+)?$/, 200.50)
// console.log(validation)
// console.log(validation2)
const path = regex.validation(/^[/](web)[/][a-z]*$/i, '/web/')
// console.log(path)

console.log((/^[/](web)[/][a-z]*$/i).test('/web/'))

const parametro = '647899c3d40c76ad3f33c3d4'
const regexProof = /^[a-zA-Z0-9]+$/

if (regexProof.test(parametro)) {
  console.log('El parámetro es válido')
} else {
  console.log('El parámetro es inválido')
}

// date
const today = new Date()
const todayModified = (today.getDate() + ' ' + today.toLocaleDateString(), today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds())

// console.log(String(today.toUTCString()))
// console.log(today.toTimeString())
