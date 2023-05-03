import ProductsDbDAO from "../DAO/DAOS/Products.DAO.db.js";
import productModel from "../dao/DBmodels/Product.model.js";
import Product from "../models/Product.js";

class ProductsService{

    async loadProduct(prod){


        const codeProd = await ProductsDbDAO.findElementByProjection({code: prod.code}, {code: 1})
        console.log(codeProd)

        codeProd.forEach(elem => {
            if(elem.code === prod.code){
                throw new Error("This CODE already exists")
            }
        })

        const newProd = new Product(prod)
        return await ProductsDbDAO.creaeteElement(newProd)
    }

    async getProducts(){
        return await ProductsDbDAO.findElements()
    }

    async getProductsByQuery(queryCli){
        return await ProductsDbDAO.findElementsByQuery(queryCli)
    }

    async getProductById(pid){
        try {
            return await ProductsDbDAO.findElementById(pid)
        } catch (error) {
            throw new Error("Product not existing")
        }
    }

    async updateProduct(pid, data){

        return await ProductsDbDAO.updateElement({ _id: pid }, data)
    }

    async sortAndShowElements(value){
        
        const sort = value

        if (!sort || sort != 1 && sort != -1) {
            throw new Error("The sort value only can be 1 or -1")
        } else {
            return await ProductsDbDAO.sortElements({price: sort})
        }
    }

    async deleteProduct(pid){
        return await ProductsDbDAO.deleteElement(pid)
    }

    async productsByPaginate(limitValue, pageValue){
        const products = await productModel.paginate({}, { limit: limitValue, page: pageValue, lean:true })
        return products
    }
};

const productsService = new ProductsService();

export default productsService;