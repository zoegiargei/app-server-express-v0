import { io } from '../../main.js'
function addIoToReq (req, res, next) {
    req.allProducts = []
    req.io = io
    next()
}
export default addIoToReq
