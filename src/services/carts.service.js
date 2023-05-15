import CartDbDAO from "../DAO/DB_DAOs/Carts.DAO.db.js"
import factory from "../DAO/factory.js";
import Cart from "../models/Cart.js";

class CartsService{
    constructor(cartDbDAO){
        this.cartDbDAO = cartDbDAO
    }
    
    async createCart(uemail){

        const newCart = new Cart(null,uemail)
        const cart = await this.cartDbDAO.creaeteElement(newCart)
        return cart
    };


    async getLastOne(){

        const lastOne = await this.cartDbDAO.findTheLastOne()
        return lastOne
    };


    async loadProductInCart(cid, data){

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ return new Error("Cart not existing") }
        
        if(!data || data === []){ return new Error("Sent an invalidate value") }

        cartInDb.productsCart = data
        
        return await this.cartDbDAO.replaceElement(cid, cartInDb)
    };


    async getCartById(cid){
        return await this.cartDbDAO.findElementById(cid)
    };


    async getCartByIdPopulated(cid){
        return await this.cartDbDAO.findElementById(cid)
    };


    async addToCart(cid, pid, quantity=1){

        console.log(pid)
        const productById = await factory.productsService.getProductById(pid)
        console.log(productById)
        if(!productById){
            throw new Error('product not existing')
            //res.status(400).send({ status:"error", error:"Product not existing" })
        }
        const stock = productById.stock

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ return new Error("Cart not existing") }
        
        if(cartInDb.productsCart.find(prod => String(prod.product._id) === pid)){

            cartInDb.productsCart.forEach(obj => {

                if(String(obj.product._id) === pid){
                    if(stock > 0 && stock > obj.quantity)
                    obj.quantity += quantity
                }
            })

        } else {

            if(stock > 0 && quantity < stock){
                cartInDb.productsCart.push({ product: pid, quantity: quantity })
            }
        }

        productById.stock = productById.stock - quantity
        await factory.productsService.updateProduct(pid, productById)
        await this.cartDbDAO.replaceElement(cid, cartInDb)
    };


    async updateProdInCart(cid, pid, newQuantity){

        const productById = await factory.productsService.getProductById(pid)
        console.log('>>>>product in update prod in cart')
        console.log(productById)
        if(!productById){
            res.status(400).send({ status:"error", error:"Product not existing" })
        }

        const stock = productById.stock

        const cartInDb = await this.cartDbDAO.findElementById(cid)
        if(!cartInDb){ return new Error("Cart not existing") }

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
            const savedProd = await factory.productsService.getProductById(pid)
            console.log(savedProd)
            savedProd.stock = savedProd.stock + quantity

            await factory.productsService.updateProduct(pid, savedProd)
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
            console.log(pid)
            const quantity = prod.quantity
            const product = await factory.productsService.getProductById(pid)
            console.log('deleteAllProducts')
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

        console.log(cartInDb.productsCart)
        cartInDb.productsCart.forEach(async prod => {
            
            const pid = prod.product._id
            const quantity = prod.product.quantity
            const product = await factory.productsService.getProductById(pid)
            product[0].stock = product[0].stock + quantity
            await factory.productsService.updateProduct(pid, product)
        });

        return await this.cartDbDAO.deleteElement(cid)
    }

};

const cartsService = new CartsService(CartDbDAO);

export default cartsService;