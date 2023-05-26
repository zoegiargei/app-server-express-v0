import factory from '../../DAO/factory.js'
import { PORT } from '../../configs/server.config.js'

export const contrShowProducts = async (req, res) => {
    try {
        const page = req.query.page || 1
        const allProducts = await factory.productsService.productsByPaginate(3, page)
    
        const thIsProducts = allProducts['docs'].length > 0
    
        const prevLink = allProducts.hasPrevPage ? `http://localhost:${PORT}/web/products/products?page=${allProducts.prevPage}` : null
        const nextLink = allProducts.hasNextPage ? `http://localhost:${PORT}/web/products//products?page=${allProducts.nextPage}` : null
        
        const numPage = allProducts.page
        const loggedin = req.user
    
        res.render('products', { title: 'Products By Paginate', loggedin:loggedin, thIsProducts: thIsProducts, products: allProducts['docs'], prevLink: prevLink || false, nextLink: nextLink? nextLink : false , numberPage: numPage })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}