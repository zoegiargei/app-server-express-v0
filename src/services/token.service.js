import tokenDbDAO from '../DAO/DB_DAOs/Tokens.DAO.db.js'
import Token from '../models/Token.js'
import encryptedJWT from '../utils/jwt/encrypted.jwt.js'
import { v4 as uuidv4 } from 'uuid'

class TokenServices {
    constructor (tokenDAO) {
        this.tokenDAO = tokenDAO
    }

    async createToken (userId) {
        const ttl = '1h'
        const randomScript = uuidv4()
        const token = new Token(userId, encryptedJWT.encryptData(randomScript, ttl))
        return token
    }

    async getTokenByUserId (uid) {
        const tokenInDb = await tokenDbDAO.findElementsByQuery({ userId: uid })
        return tokenInDb
    }

    async saveTockenUpdatePass (uid, token) {
        const tokenInDb = await this.getTokenByUserId(uid)
        if (tokenInDb.length > 0) {
            await tokenDbDAO.deleteElement(tokenInDb._id)
        }
        const resultSave = await tokenDbDAO.creaeteElement(token)
        return resultSave
    }
}
const tokenService = new TokenServices(tokenDbDAO)
export default tokenService
