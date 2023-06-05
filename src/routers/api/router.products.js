import { Router } from 'express'
import { contrDelProd, contrGetProd, contrGetProducts, contrPostProd, contrPutProd } from '../../controllers/api/products.controller.js'
import { authenticationByRole } from '../../middlewares/authentication/authentication.byRole.js'
import ConfigMulter from '../../utils/multer/config.files.multer.js'
import regex from '../../utils/regex/Regex.js'

const configMulterProof = new ConfigMulter('./public/uploads/thumbnails')
const uploadAttach = configMulterProof.configUpload()

const routerProducts = Router()

routerProducts.param('pid', async (req, res, next, pid) => {
    if (regex.validation(regex.num_letters_notCharacters, String(pid))) {
        next()
    } else {
        pid = null
    }
    next()
})

routerProducts.get('/:pid', contrGetProd)

routerProducts.get('/', contrGetProducts)

routerProducts.post('/addProduct', authenticationByRole(['Admin', 'Premium']), uploadAttach.single('attach'), contrPostProd)

routerProducts.put('/:pid', authenticationByRole(['Admin', 'Premium']), contrPutProd)

routerProducts.delete('/:pid', authenticationByRole(['Admin', 'Premium']), contrDelProd)

export default routerProducts
