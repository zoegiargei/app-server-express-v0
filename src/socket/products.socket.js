import factory from "../DAO/factory.js";

export async function configProductsSocket(io, socketSideServer){
    
    const allProducts = factory.productsService.getProducts()
    socketSideServer.emit('allProducts', allProducts)

};