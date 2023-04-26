import { AuthenticationFailed } from "../errors/Authentication.failed.js";
import encryptedJWT from "../utils/jwt/encrypted.jwt.js";
import encryptedPass from "../utils/password/encrypted.pass.js";
import usersService from "./users.service.js";

class AuthenticationService{

    async login(email, password){

        const user = await usersService.getUserByQuery({ email: email })

        if(!user || user.length === 0){
            console.log('User not existing')
            return new AuthenticationFailed()
        }
    
        user.forEach(field => {
                
            const isValidatePassword = encryptedPass.isValidPassword(field.password, password)
            
            if(!isValidatePassword){
                return new AuthenticationFailed()
            }
        })

        return user[0]
    }
};

const authenticationService = new AuthenticationService();
export default authenticationService;