// Value object
import { errorsModel } from '../../Errors.js'

export class UserEmail {
    #regexEmail = /^([a-zA-Z0-9._-]+)@(gmail|hotmail)\.com$/
    constructor (value) {
        this.value = value

        this.#ensureValueIsDefined(value)
        this.#ensureValueIsValidEmail(value)
    }

    #ensureValueIsDefined (value) {
        if (typeof value !== 'string' || value === null || value === '') {
            errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'Value must be defined')
        }
    }

    #ensureValueIsValidEmail (value) {
        if (!this.#regexEmail.test(value)) {
            errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, `${value} is not a valid email`)
        }
    }

    equals (otherEmail) {
        return this.value === otherEmail
    }

    toString () {
        return this.value
    }
}

export class UserPassword {
    #regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    constructor (value) {
        this.value = value

        this.#ensureValueIsDefined(value)
        this.#ensureValueIsValidPassword(value)
    }

    #ensureValueIsDefined (value) {
        if (typeof value !== 'string' || value === null || value === '') {
            errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'Value must be defined')
        }
    }

    #ensureValueIsValidPassword (value) {
        if (!this.#regexPassword.test(value)) {
            errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, `${value} is not a valid Password. Password Must contain at least one uppercase letter ((?=.*[A-Z])). Must contain at least one lowercase letter. Must contain at least one digit. Must contain at least one special character from the set. Must be at least 8 characters long`)
        }
    }
}

/*
    Password:
    Must contain at least one uppercase letter ((?=.*[A-Z])).
    Must contain at least one lowercase letter ((?=.*[a-z])).
    Must contain at least one digit ((?=.*\d)).
    Must contain at least one special character from the set @$!%*?& ((?=.*[@$!%*?&])).
    Must be at least 8 characters long ({8,}).
*/
