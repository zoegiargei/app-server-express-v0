export function errorHandler(error, req, res, next) {

    switch(error.type){
        case 'AUTH_FAILED':
            
            req['messageError'] = error.type
            res.status(401)
            break
        case 'PERMISSIONS_FAILED':
            
            req['messageError'] = error.type
            res.status(403)
            break
        default:

            req['messageError'] = error.type
            res.status(500)
    }

    console.log(error)
    res.json({ errorMsg: error.message })
};