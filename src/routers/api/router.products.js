import { Router } from 'express'
import { contrDelProd, contrGetProd, contrGetProducts, contrPostProd, contrPutProd } from '../../controllers/api/products.controller.js'
import { authenticationByRole } from '../../middlewares/authentication/authentication.byRole.js'
import ConfigMulter from '../../utils/multer/config.files.multer.js'
// import regex from '../../utils/regex/Regex.js'
// import { param, validationResult } from 'express-validator'

const configMulterProof = new ConfigMulter('./public/uploads/thumbnails')
const uploadAttach = configMulterProof.configUpload()

const routerProducts = Router()

/* routerProducts.param('pid', async (req, res, next, pid) => {
    const sanitizedPid = param('pid').trim().escape()
    // const isValidMongoId = await param('pid').isMongoId().run(req)
    const errors = validationResult(req)
    req.params.pid = sanitizedPid // Store the sanitized and validated product ID in req.params.pid
    next()
    if (errors.length) {
      req.params.pid = null
      next(errors)
    }
}) */

// Route definition
routerProducts.get('/:pid', contrGetProd)

routerProducts.get('/', contrGetProducts)

routerProducts.post('/addProduct', authenticationByRole(['Admin', 'Premium']), uploadAttach.single('attach'), contrPostProd)

routerProducts.put('/:pid', authenticationByRole(['Admin', 'Premium']), contrPutProd)

routerProducts.delete('/:pid', authenticationByRole(['Admin', 'Premium']), contrDelProd)

export default routerProducts
