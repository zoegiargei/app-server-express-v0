import factory from '../../DAO/factory.js'
import { errorsModel } from '../../models/Errors.js'
import regex from '../../utils/regex/Regex.js'

export const contrGetProd = async (req, res, next) => {
    /*     const categorys = [
        'title',
        'description',
        'code',
        'price',
        'status',
        'stock',
        'category'
    ] */

    try {
        let response
        if (req.params.id) {
            const pid = String(req.params.pid)
            response = await factory.productsService.getProductById(pid)
            if (!response) {
                errorsModel.throwOneError(errorsModel.ERROR_NOT_FOUND, `Product not found: ${pid}`)
            }
        }

        /*         if (req.query) {
            const query = req.query // sanitizar y validar
            if (categorys.includes(Object.keys(query))) {
                response = await factory.productsService.getProductsByQuery(req.query)
                if (!response) {
                    errorsModel.throwOneError(errorsModel.INVALID_REQ_ERROR, `You sent an invalid query: ${query}`)
                }
            }
        } */

        res.sendOk({ message: 'Product lookup by id was found successfully', object: response })
    } catch (error) {
        next(error)
    }
}

export const contrGetProducts = async (req, res, next) => {
    try {
        const limit = req.query.limit || 10
        const page = req.query.page || 1
        const valueStock = req.query.stock
        const sort = req.query.sort
        const queryCli = req.query.queryCli
        const cat = req.query.category

        let response
        if (cat) {
            const categorySent = regex.validation(regex.onlyNumbers, cat)
            response = await factory.productsService.getProductsByQuery({ category: categorySent })
        } else if (valueStock) {
            const stock = regex.validation(regex.onlyNumbers, Number(valueStock))
            response = await factory.productsService.getProductsByQuery({ stock: { $eq: stock } })
        } else if (page) {
            const numPage = regex.validation(regex.onlyNumbers, Number(page))
            response = await factory.productsService.productsByPaginate(limit, numPage)

            const prevLink = response.hasPrevPage ? `api/products/limit=${limit}&?page=${Number(page) - 1}` : null
            const nextLink = response.hasPrevPage ? `api/products/limit=${limit}&?page=${Number(page) + 1}` : null

            return res.sendOk({ message: 'Products lookup by page were found successfully', object: [response, prevLink, nextLink] })
        } else if (sort) {
            response = await factory.productsService.sortAndShowElements(sort)
        } else if (queryCli) {
            // eslint-disable-next-line object-shorthand
            const query = { queryCli: queryCli }
            response = await factory.productsService.getProductsByQuery(query)
        }

        if (!response) errorsModel.throwOneError(errorsModel.INVALID_REQ_ERROR, 'INVALID REQUEST')
        const allProducts = response.slice(0, limit)
        res.sendOk({ message: 'All products', object: allProducts })
    } catch (error) {
        next(error)
    }
}

export const contrPostProd = async (req, res, next) => {
    try {
        const attach = req.file
        const data = JSON.parse(req.body.data)
        req.logger.warn(data)
        req.logger.warn(`>>>req.file ${attach}`)
        req.logger.debug(`>>> attach.url ${attach.url}`)
        if (!attach || !data) errorsModel.throwOneError(errorsModel.INVALID_REQ_ERROR, 'Bad request')

        const savedProduct = await factory.productsService.loadProduct(data, attach)

        // const allProducts = await factory.productsService.getProducts()
        // req.io.sockets.emit('updateView', allProducts)

        res.sendCreated({ message: 'Product updated successfully', object: savedProduct })
    } catch (error) {
        next(error)
    }
}

export const contrPutProd = async (req, res, next) => {
    try {
        const pid = req.params.pid
        const data = req.body

        let productUpdated
        if (req.user.role === 'Premium') {
            const product = await factory.productsService.getProductById(pid)
            if (!product) errorsModel.throwOneError(errorsModel.ERROR_NOT_FOUND, `Product not found: ${pid}`)
            const productOwner = product.owner
            if (productOwner === req.user.email) {
                productUpdated = await factory.productsService.updateProduct(pid, data)
            } else {
                errorsModel.throwOneError(errorsModel.PERMISSIONS_FAILED, 'You are not allowed to updated that product')
            }
        }
        productUpdated = await factory.productsService.updateProduct(pid, data)

        res.sendOk({ message: 'Product updated successfully', object: productUpdated })
    } catch (error) {
        next(error)
    }
}

export const contrDelProd = async (req, res, next) => {
    try {
        const pid = req.params.pid

        let productDeleted
        if (req.user.role === 'Premium') {
            const product = await factory.productsService.getProductById(pid)
            if (!product) errorsModel.throwOneError(errorsModel.ERROR_NOT_FOUND, `Product not found: ${pid}`)

            const productOwner = product.owner
            if (productOwner === req.user.email) {
                productDeleted = await factory.productsService.deleteProduct(pid)
            } else {
                errorsModel.throwOneError(errorsModel.PERMISSIONS_FAILED, 'You are not allowed to delete that product')
            }
        }

        productDeleted = await factory.productsService.deleteProduct(pid)
        res.sendNoContent({ message: 'Product deleted', object: productDeleted })
    } catch (error) {
        next(error)
    }
}
