import CartDbManager from "../dao/DBmanagers/Carts.manager.db.js";
import Cart from "../models/Cart.js";

class CartsService{

    
    async createCart(){

        const newCart = new Cart()
        return await CartDbManager.saveElement(newCart)
    };


    async loadProductInCart(cid, data){

        const cartInDb = await CartDbManager.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }
        
        if(!data || data === []){ throw new Error("Sent an invalidate value") }

        cartInDb.productsCart = data
        
        return await CartDbManager.replaceElement(cid, cartInDb)
    };


    async getCartById(cid){
        return await CartDbManager.findElementById(cid)
    };


    async getCartByIdPopulated(cid){
        return await CartDbManager.findElementById(cid)
    };


    async addToCart(cid, pid){

        const cartInDb = await CartDbManager.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }
        
        if(cartInDb.productsCart.find(prod => String(prod.product._id) === pid)){

            cartInDb.productsCart.forEach(obj => {

                if(String(obj.product._id) === pid){
                    obj.quantity += 1
                }
            })

        } else {

            cartInDb.productsCart.push({ product: pid, quantity: 1 })
        }

        await CartDbManager.replaceElement(cid, cartInDb)
    };


    async updateProdInCart(cid, pid, newQuantity){

        const cartInDb = await CartDbManager.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        if(cartInDb.productsCart.find(prod => String(prod.product._id) === pid)){

            cartInDb.productsCart.forEach(obj => {

                if(String(obj.product._id) === pid){
                    obj.quantity = newQuantity
                }
            })

            await CartDbManager.replaceElement(cid, cartInDb)

        } else{
            throw new Error("Product not existing in the cart")
        }
    };


    async delProdInCart(cid, pid){

        const cartInDb = await CartDbManager.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        if(cartInDb.productsCart.find(prod => String(prod.product._id) === pid)){

            const newCartInDb = cartInDb.productsCart.filter(prod => String(prod.product._id) != pid)
            await CartDbManager.replaceElement(cid, newCartInDb)

        } else{
            throw new Error("Product in cart not found")
        }

    };


    async deleteAllProducts(cid){
        
        const cartInDb = await CartDbManager.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        cartInDb.productsCart = []
        return await CartDbManager.replaceElement(cid, cartInDb)
    };

};

const cartsService = new CartsService();

export default cartsService;