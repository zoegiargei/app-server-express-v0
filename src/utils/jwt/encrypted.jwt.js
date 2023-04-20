import { JWT_PRIVATE_KEY } from "../../configs/auth.config.js";
import jwt from "jsonwebtoken";
class EncryptedJwt{

    encryptData(data){
        const token = jwt.sign(JSON.parse(JSON.stringify(data)), JWT_PRIVATE_KEY, { expiresIn: '24h' })
        return token
    }

    /*     decryptData(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_PRIVATE_KEY, (err, decodedPayload) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(decodedPayload)
                }
            })
        })
    } */
};

const encryptedJWT = new EncryptedJwt();
export default encryptedJWT;