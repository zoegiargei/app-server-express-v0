import usersManagerDb from "../dao/DBmanagers/Users.manager.db.js";
import encryptedPass from "../utils/passport/encrypted.pass.js";
import encryptedJWT from "../utils/jwt/encrypted.jwt.js";

class AuthenticationService{
    constructor(usersManagerDb, encryptedPass, encryptedJWT){
        this.usersManager = usersManagerDb,
        this.encryptedPass = encryptedPass,
        this.encryptedJWT = encryptedJWT
    }

    async login(username, password){}

    async authenticationByRole(){}
};