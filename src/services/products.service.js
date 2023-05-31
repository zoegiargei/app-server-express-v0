import productModel from '../DAO/DBmodels/Product.model.js'
import Product from '../models/Product.js'

class ProductsService {
    constructor (productsDbDAO) {
        this.productsDbDAO = productsDbDAO
    }

    async loadProduct (prod) {
        const codeProd = await this.productsDbDAO.findElementByProjection({ code: Number(prod.code) }, { code: 1 })

        if (codeProd.length > 0) {
            throw new Error('This CODE already exists')
        }

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
        try {
            return await this.productsDbDAO.findElementById(pid)
        } catch (error) {
            return new Error('Product not existing')
        }
    }

    async updateProduct (pid, data) {
        return await this.productsDbDAO.updateElement({ _id: pid }, data)
    }

    async sortAndShowElements (value) {
        const sort = value

        if ((!sort || sort !== 1) && (sort !== -1)) {
            return new Error('The sort value only can be 1 or -1')
        } else {
            return await this.productsDbDAO.sortElements({ price: sort })
        }
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
