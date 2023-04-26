import productsService from "../services/products.service.js";

export async function configProductsSocket(io, socketSideServer){
    
    const allProducts = productsService.getProducts()
    socketSideServer.emit('allProducts', allProducts)

};