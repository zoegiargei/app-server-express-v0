import factory from '../../DAO/factory.js'
import { classErrors } from '../../errors/Errors.js'
import regex from '../../utils/regex/Regex.js'

export const contrGetProd = async (req, res) => {
    const categorys = [
        'title',
        'description',
        'code',
        'price',
        'status',
        'stock',
        'category'
    ]

    try {
        const pid = String(req.params.pid)
        const newPid = pid.slice(1)

        if (req.params.pid) {
            const product = await factory.productsService.getProductById(newPid)
            if (!product) {
                return new Error(classErrors.throwOneError(classErrors.ERROR_INVALID_ARGUMENT, String(req.params.pid)))
            }
            res.sendOk({ message: 'Product lookup by id was found successfully', object: product })
        } else if (req.query) {
            const query = req.query

            if (categorys.includes(Object.keys(query))) {
                const products = await factory.productsService.getProductsByQuery(req.query)
                res.sendOk({ message: 'Products lookup by Query were found successfully', object: products })
            }
        }
    } catch (error) {
        res.sendClientError(error)
    }
}

export const contrGetProducts = async (req, res) => {
    try {
        const limit = req.query.limit || 10
        const page = req.query.page || 1
        const valueStock = req.query.stock
        const sort = req.query.sort
        const queryCli = req.query.queryCli
        const cat = req.query.category

        const allProducts = (await factory.productsService.getProducts()).slice(0, limit)

        if (cat) {
            try {
                regex.validation(regex.numbersBlanksAndText, String(cat))
                const categorySent = regex.validation(regex.numbersBlanksAndText, String(cat))
                const productsByCat = await factory.productsService.getProductsByQuery({ category: categorySent })
                return res.sendOk({ message: 'Products lookup by Category were found successfully', object: productsByCat })
            } catch (error) {
                res.sendClientError(error)
            }
        } else if (valueStock) {
            try {
                const stock = regex.validation(regex.onlyNumbers(Number(valueStock)))
                const prodsByStock = await factory.productsService.getProductsByQuery({ stock: { $eq: stock } })
                return res.sendOk({ message: 'Products lookup by stock were found successfully', object: prodsByStock })
            } catch (error) {
                res.sendClientError(error)
            }
        } else if (page) {
            try {
                const numPage = regex.validation(regex.onlyNumbers(Number(page)))
                const productsByPage = await factory.productsService.productsByPaginate(limit, numPage)

                const prevLink = productsByPage.hasPrevPage ? `api/products/limit=${limit}&?page=${Number(page) - 1}` : null
                const nextLink = productsByPage.hasPrevPage ? `api/products/limit=${limit}&?page=${Number(page) + 1}` : null

                return res.sendOk({ message: 'Products lookup by page were found successfully', object: [productsByPage, prevLink, nextLink] })
            } catch (error) {
                res.sendClientError(error)
            }
        } else if (sort) {
            const sortedProducts = await factory.productsService.sortAndShowElements(sort)
            return res.sendOk({ message: 'Products were sorted successfully', object: sortedProducts })
        } else if (queryCli) {
            if (typeof (queryCli) !== 'object') { return new Error(classErrors.throwOneError(classErrors.ERROR_INVALID_ARGUMENT, String(queryCli))) }

            try {
                const prodByQuery = await factory.productsService.getProductsByQuery(queryCli)
                return res.sendOk({ message: 'Products lookup by query were found successfully', object: prodByQuery })
            } catch (error) {
                res.sendClientError(error)
            }
        }

        return res.sendOk({ message: 'All products', object: allProducts })
    } catch (error) {
        res.sendClientError(error)
    }
}

export const contrPostProd = async (req, res) => {
    try {
        req.logger.debug(`>>>req.file ${req.file}`)

        const data = req.body

        const savedProduct = await factory.productsService.loadProduct(data)

        const allProducts = await factory.productsService.getProducts()
        req.io.sockets.emit('updateView', allProducts)
        res.sendCreated({ message: 'Product updated successfully', object: savedProduct })
    } catch (error) {
        res.sendClientError(error)
    }
}

export const contrPutProd = async (req, res) => {
    try {
        const pid = req.params.pid
        const data = req.body

        const productUpdated = await factory.productsService.updateProduct(pid, data)
        res.sendOk({ message: 'Product updated successfully', object: productUpdated })
    } catch (error) {
        res.sendClientError(error)
    }
}

export const contrDelProd = async (req, res) => {
    try {
        const pid = req.params.pid
        const productDeleted = await factory.productsService.deleteProduct(pid)
        return res.sendOk({ message: 'Product deleted', object: productDeleted })
    } catch (error) {
        res.sendClientError(error)
    }
}
