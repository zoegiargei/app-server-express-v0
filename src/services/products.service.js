import productModel from '../DAO/DBmodels/Product.model.js'
import { winstonLogger } from '../middlewares/loggers/logger.js'
import { errorsModel } from '../models/Errors.js'
import Product from '../models/Product.js'

class ProductsService {
    constructor (productsDbDAO) {
        this.productsDbDAO = productsDbDAO
    }

    async loadProduct (data, attach) {
        const codeProd = await this.productsDbDAO.findElementByProjection({ code: Number(data.code) }, { code: 1 })

        if (codeProd.length > 0) return errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'CODE NOT EXISTING')
        const prod = { ...data, thumbnail: attach }
        winstonLogger.warn(prod)

        const newProd = new Product(prod)
        await this.productsDbDAO.creaeteElement(newProd)
        return newProd
    }

    async getProducts () {
        return await this.productsDbDAO.findElements()
    }

    async getProductsByQuery (queryCli) {
        return await this.productsDbDAO.findElementsByQuery(queryCli)
    }

    async getProductById (pid) {
        const product = await this.productsDbDAO.findElementById(pid)
        if (!product) return errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'Sent an invalid product id')
        return product
    }

    async updateProduct (pid, data) {
        return await this.productsDbDAO.updateElement({ _id: pid }, data)
    }

    async sortAndShowElements (value) {
        const sort = value
        if ((!sort || sort !== 1) && (sort !== -1)) return errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'The sort value only can be 1 or -1')
        return await this.productsDbDAO.sortElements({ price: sort })
    }

    async deleteProduct (pid) {
        return await this.productsDbDAO.deleteElement(pid)
    }

    async productsByPaginate (limitValue, pageValue) {
        const products = await productModel.paginate({}, { limit: limitValue, page: pageValue, lean: true })
        return products
    }
}
export default ProductsService
