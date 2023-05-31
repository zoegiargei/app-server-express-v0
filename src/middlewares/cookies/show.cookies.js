export function showCookies (req, res, next) {
    console.dir(req.cookies)
    console.dir(req.signedCookies)
    next()
}
export default showCookies
