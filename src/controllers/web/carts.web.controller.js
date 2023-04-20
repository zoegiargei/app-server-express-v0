import cartsService  from "../../services/carts.service.js";

export const contrShowCart = async (req, res) => {
    try {
        
        const cid = req.cid
        const cart = await cartsService.getCartById(cid)
        const thIsProducts = cartsService.length > 0
        const products = cart.productsCart
    
        res.render('cartId', { title: 'Cart', thIsProducts: thIsProducts, products: products })
    
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};