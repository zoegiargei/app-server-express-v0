import CartDbDAO from '../DAO/DB_DAOs/Carts.DAO.db.js'
import factory from '../DAO/factory.js'
import Cart from '../models/Cart.js'
import { errorsModel } from '../models/Errors.js'

class CartsService {
    constructor (cartDbDAO) {
        this.cartDbDAO = cartDbDAO
    }

    async validateCartId (cid) {
        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if (!cartInDb) return errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'Invalid cart id')
        return cartInDb
    }

    async validateProductId (pid) {
        const productById = await factory.productsService.getProductById(pid)
        if (!productById) return errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'Invalid product id')
        return productById
    }

    async createCart (email) {
        const newCart = new Cart(email)
        const cart = await this.cartDbDAO.creaeteElement(newCart)
        return cart
    }

    async getLastOne () {
        const lastOne = await this.cartDbDAO.findTheLastOne()
        return lastOne
    }

    async getCartById (cid) {
        return await this.cartDbDAO.findElementById(cid)
    }

    async addToCart (cid, pid, quantity = 1) {
        const cartInDb = this.validateCartId(cid)
        const productById = this.validateProductId(pid)
        if (cartInDb.productsCart.find(prod => String(prod.product._id) === pid)) {
            cartInDb.productsCart.forEach(obj => {
                if (String(obj.product._id) === pid) {
                    obj.quantity += Number(quantity)
                }
            })
        } else {
            cartInDb.productsCart.push({ product: pid, quantity: Number(quantity) })
        }
        productById.stock = productById.stock - quantity
        await factory.productsService.updateProduct(pid, productById)
        await this.cartDbDAO.replaceElement(cid, cartInDb)
    }

    async updateProductsCart (cid, data) {
        const cartInDb = this.validateCartId(cid)
        if (!data || data === []) errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'You sent an invalid data for update the cart')
        cartInDb.productsCart = data
        return await this.cartDbDAO.replaceElement(cid, cartInDb)
    }

    async updateProdInCart (cid, pid, newQuantity) {
        const cartInDb = this.validateCartId(cid)
        const productById = this.validateProductId(pid)

        if (cartInDb.productsCart.find(prod => String(prod.product._id) === pid)) {
            cartInDb.productsCart.forEach(obj => {
                if (String(obj.product._id) === pid) {
                    productById.stock = productById.stock + obj.quantity
                    obj.quantity = newQuantity
                }
            })

            productById.stock = productById.stock - newQuantity
            await factory.productsService.updateProduct(pid, productById)
            await this.cartDbDAO.replaceElement(cid, cartInDb)
        } else {
            return errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'Product not existing in the cart')
        }
    }

    async delProdInCart (cid, pid) {
        const cartInDb = this.validateCartId(cid)
        const product = cartInDb.productsCart.find(prod => String(prod.product._id) === pid)
        const quantity = product.quantity

        if (product) {
            const newCartInDb = cartInDb.productsCart.filter(prod => String(prod.product._id) !== pid)
            const productInDb = await factory.productsService.getProductById(pid)
            productInDb.stock = productInDb.stock + quantity

            await factory.productsService.updateProduct(pid, productInDb)
            await this.cartDbDAO.replaceElement(cid, newCartInDb)
        } else {
            return errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'Product not existing in the cart')
        }
    }

    async deleteAllProducts (cid) {
        const cartInDb = this.validateCartId(cid)

        cartInDb.productsCart.forEach(async (prod) => {
            const pid = String(prod.product._id)
            console.log(' >>>>> Product id in "deleteAllProducts" / proof ')
            console.log(pid)

            console.log(' >>>>> Quantity of product in "deleteAllProducts" / proof ')
            const quantity = prod.quantity
            console.log(quantity)

            const product = this.validateProductId(pid)
            console.log('>>>>> Product by id in "deleteAllProducts" / proof ')
            console.log(product)

            product.stock = product.stock + quantity
            await factory.productsService.updateProduct(pid, product)
        })

        cartInDb.productsCart = []
        return await this.cartDbDAO.replaceElement(cid, cartInDb)
    }

    async deleteCart (cid) {
        const cartInDb = this.validateCartId(cid)

        console.log('>>>>> productsCart in deleteCart / proof ')
        console.log(cartInDb.productsCart)

        cartInDb.productsCart.forEach(async prod => {
            const pid = prod.product._id
            const quantity = prod.quantity
            const product = await factory.productsService.getProductById(pid)
            product.stock = product.stock + quantity
            await factory.productsService.updateProduct(pid, product)
        })

        return await this.cartDbDAO.deleteElement(cid)
    }
}

const cartsService = new CartsService(CartDbDAO)
export default cartsService
