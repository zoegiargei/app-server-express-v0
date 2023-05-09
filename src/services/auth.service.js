import { AuthenticationFailed } from "../errors/Authentication.failed.js";
import encryptedPass from "../utils/password/encrypted.pass.js";
import usersService from "./users.service.js";

class AuthenticationService{
    constructor(usersService, encryptedPassword, authenticationError){
        this.usersService = usersService,
        this.encryptedPassword = encryptedPassword,
        this.authenticationError = authenticationError
    }

    async login(email, password){

        const user = await this.usersService.getUserByQuery({ email: email })

        if(!user || user.length === 0){
            console.log('User not existing')
            return this.authenticationError
        }
                
        const isValidatePassword = this.encryptedPassword.isValidPassword(user[0].password, password)
        if(!isValidatePassword){
            return new this.authenticationError
        }

        const userToSend = user[0]
        return userToSend
    }
};

const authenticationService = new AuthenticationService(usersService, encryptedPass, new AuthenticationFailed());
export default authenticationService;