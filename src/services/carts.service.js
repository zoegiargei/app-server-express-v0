import CartDbDAO from "../DAO/DB_DAOs/Carts.DAO.db.js"
import factory from "../DAO/factory.js";
import Cart from "../models/Cart.js";

class CartsService{
    constructor(cartDbDAO){
        this.cartDbDAO = cartDbDAO
    }
    
    async createCart(){

        const newCart = new Cart()
        const cart = await this.cartDbDAO.creaeteElement(newCart)
        return cart
    };


    async getLastOne(){

        const lastOne = await this.cartDbDAO.findTheLastOne()
        return lastOne
    };


    async loadProductInCart(cid, data){

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }
        
        if(!data || data === []){ throw new Error("Sent an invalidate value") }

        cartInDb.productsCart = data
        
        return await this.cartDbDAO.replaceElement(cid, cartInDb)
    };


    async getCartById(cid){
        return await this.cartDbDAO.findElementById(cid)
    };


    async getCartByIdPopulated(cid){
        return await this.cartDbDAO.findElementById(cid)
    };


    async addToCart(cid, pid){

        const productById = await factory.productsService.getProductById(pid)

        if(!productById){
            res.status(400).send({ status:"error", error:"Product not existing" })
        }

        const stock = productById.stock

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }
        
        if(cartInDb.productsCart.find(prod => String(prod.product._id) === pid)){

            cartInDb.productsCart.forEach(obj => {

                if(String(obj.product._id) === pid){
                    if(stock > 0 && stock > obj.quantity)
                    obj.quantity += 1
                }
            })

        } else {

            if(stock > 0){
                cartInDb.productsCart.push({ product: pid, quantity: 1 })
            }
        }

        productById.stock = productById.stock - 1
        await factory.productsService.updateProduct(pid, productById)
        await this.cartDbDAO.replaceElement(cid, cartInDb)
    };


    async updateProdInCart(cid, pid, newQuantity){

        const productById = await factory.productsService.getProductById(pid)

        if(!productById){
            res.status(400).send({ status:"error", error:"Product not existing" })
        }

        const stock = productById.stock

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        if(cartInDb.productsCart.find(prod => String(prod.product._id) === pid)){

            cartInDb.productsCart.forEach(obj => {

                if(String(obj.product._id) === pid){
                    if(stock > newQuantity){
                        obj.quantity = newQuantity
                    }
                }
            })

            productById.stock = productById.stock - newQuantity
            await factory.productsService.updateProduct(pid, productById)
            await this.cartDbDAO.replaceElement(cid, cartInDb)

        } else{
            throw new Error("Product not existing in the cart")
        }
    };


    async delProdInCart(cid, pid){

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        if(cartInDb.productsCart.find(prod => String(prod.product._id) === pid)){

            //const product = cartInDb.productsCart.find(prod => String(prod.product._id) === pid)

            const newCartInDb = cartInDb.productsCart.filter(prod => {String(prod.product._id) != pid})
            await this.cartDbDAO.replaceElement(cid, newCartInDb)

        } else{
            throw new Error("Product in cart not found")
        }

    };


    async deleteAllProducts(cid){
        
        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        cartInDb.productsCart.forEach(async prod => {
            const pid = prod._id
            const quantity = prod.quantity
            const product = await factory.productsService.getProductById(pid)
            product.stock = product.stock + quantity
            await factory.productsService.updateProduct(pid, product)
        });

        cartInDb.productsCart = []
        return await this.cartDbDAO.replaceElement(cid, cartInDb)
    };

    async deleteCart(cid){

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        cartInDb.productsCart.forEach(async prod => {
            const pid = prod._id
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