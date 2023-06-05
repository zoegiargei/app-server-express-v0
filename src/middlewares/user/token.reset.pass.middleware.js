import tokenService from '../../services/token.service.js'

export async function authTokenResetPass (req, res, next) {
    const token = req.query.token
    if (token) {
        const tokenInDb = await tokenService.getTokenByUserId(req.user._id)
        console.log('Token en base de datos. Middleware authTokenResetPass')
        console.log(tokenInDb)
        console.log('Token en cabecera de peticion')
        console.log(token.token)
        next()
    } else {
        next(new Error('Token expired'))
    }
}
export default authTokenResetPass
