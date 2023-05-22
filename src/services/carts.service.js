import CartDbDAO from "../DAO/DB_DAOs/Carts.DAO.db.js"
import factory from "../DAO/factory.js";
import { classErrors } from "../errors/Errors.js";
import Cart from "../models/Cart.js";

class CartsService{
    constructor(cartDbDAO){
        this.cartDbDAO = cartDbDAO
    }
    
    async createCart(email){

        const newCart = new Cart(email)
        const cart = await this.cartDbDAO.creaeteElement(newCart)
        return cart
    };


    async getLastOne(){

        const lastOne = await this.cartDbDAO.findTheLastOne()
        return lastOne
    };

    
    async getCartById(cid){
        return await this.cartDbDAO.findElementById(cid)
    };
    
    
    async addToCart(cid, pid, quantity=1){
        
        console.log(pid)
        const productById = await factory.productsService.getProductById(pid)
        
        console.log(' >>>>> Product by id in "add to cart" / proof ')
        console.log(productById)
        
        if(!productById){
            return new Error(classErrors.throwOneError(classErrors.ERROR_NOT_FOUND, `${pid} is not in the Cart`))
        }
        
        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ return new Error(classErrors.throwOneError(classErrors.ERROR_NOT_FOUND.message, `${cid} not existing`)) }
        
        if(cartInDb.productsCart.find(prod => String(prod.product._id) === pid)){
            
            cartInDb.productsCart.forEach(obj => {
                
                if(String(obj.product._id) === pid){
                    obj.quantity += Number(quantity)
                }
            })
            
        } else {
            
            cartInDb.productsCart.push({ product: pid, quantity: Number(quantity) })
        }
        
        productById.stock = productById.stock - quantity
        await factory.productsService.updateProduct(pid, productById)
        await this.cartDbDAO.replaceElement(cid, cartInDb)
    };
    

    async updateProductsCart(cid, data){

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ return new Error("Cart not existing") }
        
        if(!data || data === []){ return new Error("Sent an invalidate value") }

        cartInDb.productsCart = data
        
        return await this.cartDbDAO.replaceElement(cid, cartInDb)
    };
    

    async updateProdInCart(cid, pid, newQuantity){

        const productById = await factory.productsService.getProductById(pid)

        console.log(' >>>>> Product by id in "updateProdInCart" / proof ')
        console.log(productById)

        if(!productById){
            return new Error('Product not existing')
        }

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ return new Error("Cart not existing") }

        if(cartInDb.productsCart.find(prod => String(prod.product._id) === pid)){

            cartInDb.productsCart.forEach(obj => {

                if(String(obj.product._id) === pid){
                    productById.stock = productById.stock + obj.quantity
                    obj.quantity = newQuantity
                }
            })

            productById.stock = productById.stock - newQuantity
            await factory.productsService.updateProduct(pid, productById)
            await this.cartDbDAO.replaceElement(cid, cartInDb)

        } else{
            return new Error("Product not existing in the cart")
        }
    };


    async delProdInCart(cid, pid){

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ return new Error("Cart not existing") }

        const product = cartInDb.productsCart.find(prod => String(prod.product._id) === pid)
        const quantity = product.quantity

        if(product){

            const newCartInDb = cartInDb.productsCart.filter(prod => {String(prod.product._id) != pid})
            const productInDb = await factory.productsService.getProductById(pid)
            productInDb.stock = productInDb.stock + quantity

            await factory.productsService.updateProduct(pid, productInDb)
            await this.cartDbDAO.replaceElement(cid, newCartInDb)

        } else{
            return new Error("Product in cart not found")
        }

    };


    async deleteAllProducts(cid){
        
        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ return new Error("Cart not existing") }

        cartInDb.productsCart.forEach(async (prod) => {
            
            const pid = String(prod.product._id)
            console.log(' >>>>> Product id in "deleteAllProducts" / proof ')
            console.log(pid)

            console.log(' >>>>> Quantity of product in "deleteAllProducts" / proof ')
            const quantity = prod.quantity
            console.log(quantity)

            const product = await factory.productsService.getProductById(pid)
            console.log('>>>>> Product by id in "deleteAllProducts" / proof ')
            console.log(product)

            product.stock = product.stock + quantity
            await factory.productsService.updateProduct(pid, product)
        });

        cartInDb.productsCart = []
        return await this.cartDbDAO.replaceElement(cid, cartInDb)
    };


    async deleteCart(cid){

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ return new Error("Cart not existing") }

        console.log('>>>>> productsCart in deleteCart / proof ')
        console.log(cartInDb.productsCart)

        cartInDb.productsCart.forEach(async prod => {
            
            const pid = prod.product._id
            const quantity = prod.quantity
            const product = await factory.productsService.getProductById(pid)
            product.stock = product.stock + quantity
            await factory.productsService.updateProduct(pid, product)
        });

        return await this.cartDbDAO.deleteElement(cid)
    }

};

const cartsService = new CartsService(CartDbDAO);

export default cartsService;