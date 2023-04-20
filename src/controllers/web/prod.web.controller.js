import productsService from "../../services/products.service.js";
import { PORT } from "../../configs/server.config.js";

export const contrShowProducts = async (req, res) => {
    try {
        const page = req.query.page || 1
        const allProducts = await productsService.productsByPaginate(1, page)
    
        const thIsProducts = allProducts['docs'].length > 0
    
        const prevLink = allProducts.hasPrevPage ? `http://localhost:${PORT}/web/products?page=${allProducts.prevPage}` : null
        const nextLink = allProducts.hasNextPage ? `http://localhost:${PORT}/web/products?page=${allProducts.nextPage}` : null
        const numPage = allProducts.page
    
        res.render('products', { title: 'Products By Paginate', thIsProducts: thIsProducts, products: allProducts['docs'], prevLink: prevLink || false, nextLink: nextLink? nextLink : false , numberPage: numPage})
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};