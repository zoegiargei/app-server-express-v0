import productModel from "../dao/DBmodels/Product.model.js";
import Product from "../models/Product.js";

class ProductsService{
    constructor(productsDbDAO){
        this.productsDbDAO = productsDbDAO
    }

    async loadProduct(prod){


        const codeProd = await this.productsDbDAO.findElementByProjection({code: prod.code}, {code: 1})
        console.log(codeProd)

        codeProd.forEach(elem => {
            if(elem.code === prod.code){
                throw new Error("This CODE already exists")
            }
        })

        const newProd = new Product(prod)
        return await this.productsDbDAO.creaeteElement(newProd)
    }

    async getProducts(){
        return await this.productsDbDAO.findElements()
    }

    async getProductsByQuery(queryCli){
        return await this.productsDbDAO.findElementsByQuery(queryCli)
    }

    async getProductById(pid){
        try {
            return await this.productsDbDAO.findElementById(pid)
        } catch (error) {
            throw new Error("Product not existing")
        }
    }

    async updateProduct(pid, data){

        return await this.productsDbDAO.updateElement({ _id: pid }, data)
    }

    async sortAndShowElements(value){
        
        const sort = value

        if (!sort || sort != 1 && sort != -1) {
            throw new Error("The sort value only can be 1 or -1")
        } else {
            return await this.productsDbDAO.sortElements({price: sort})
        }
    }

    async deleteProduct(pid){
        return await this.productsDbDAO.deleteElement(pid)
    }

    async productsByPaginate(limitValue, pageValue){
        const products = await productModel.paginate({}, { limit: limitValue, page: pageValue, lean:true })
        return products
    }
};

export default ProductsService;