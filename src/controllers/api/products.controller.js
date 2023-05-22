import factory from "../../DAO/factory.js";
import { classErrors } from "../../errors/Errors.js";

export const contrGetProd = async (req, res) => {
    try {

        const pid = String(req.params.pid)
        const newPid = pid.slice(1)

        if(req.params.pid){
            const product = await factory.productsService.getProductById(newPid)
            res.json({product})
        } else if(req.query){
            const products = await factory.productsService.getProductsByQuery(req.query)
            res.json({products})
        }
        
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const contrGetProducts = async (req, res) => {
    try {

        const limit = req.query.limit || 10
        const page = req.query.page || 1
        const valueStock = req.query.stock
        const sort = req.query.sort
        const queryCli = req.query.queryCli
        const cat = req.query.category

        const allProducts = (await factory.productsService.getProducts()).slice(0, limit)


        if (cat) {
            try {

                const categoryCli = String(cat)
                const productsByCat = await factory.productsService.getProductsByQuery({ category: categoryCli })
                return res.json({ productsByCat })

            } catch (error) {
                res.status(400).send({ msg: error.message })
            }
        } else if (valueStock) {
            try {

                const prodsByStock = await factory.productsService.getProductsByQuery({stock: {$eq: 200}})
                return res.json({ prodsByStock })
                
            } catch (error) {
                res.status(400).send({ msg: error.message })
            }
        } else if (page) {
            try {

                const productsByPage = await factory.productsService.productsByPaginate(limit, page)

                const prevLink = productsByPage.hasPrevPage ? `api/products/limit=${limit}&?page=${Number(page)-1}` : null
                const nextLink = productsByPage.hasPrevPage ? `api/products/limit=${limit}&?page=${Number(page)+1}` : null

                return res.status(200).json({ productsByPage, prevLink, nextLink })

            } catch (error) {
                res.status(400).send({ msg: error.message })
            }
        } else if (sort) {

            const sortedProducts = await factory.productsService.sortAndShowElements(sort)
            return res.json({ sortedProducts })

        } else if (queryCli) {
            
            if(typeof(queryCli) != 'object'){ return new Error(classErrors.throwOneError(classErrors.ERROR_INVALID_ARGUMENT, String(queryCli))) }

            try {

                const prodByQuery = await factory.productsService.getProductsByQuery(queryCli)
                return res.json({ prodByQuery })

            } catch (error) {
                res.status(400).send({ msg: error.message })
            }
        }

        return res.json({ allProducts })

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const contrPostProd = async (req, res) => {
    try {
        
        console.log(">>>>>req.file")
        console.log(req.file) //undefined //I have to fix it method middleware

        const data = req.body

        const savedProduct = await factory.productsService.loadProduct(data)

        const allProducts = await factory.productsService.getProducts()
        
        req['io'].sockets.emit('updateView', allProducts)
        
        res.status(201).json({ savedProduct });

    } catch (error) {

        res.status(400).send({ message: error.message })
    }
};


export const contrPutProd = async (req, res) => {
    try {

        const pid = req.params.pid;
        const data = req.body;

        await productsService.updateProduct(pid, data)
        res.send({ status: "success", message: "Product updated" });

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const contrDelProd = async (req, res) => {
    try {
        
        const pid = req.params.pid
        
        await productsService.deleteProduct(pid)
        return res.send({ status: "success", message: "Product deleted" })

    } catch (error) {

        res.status(400).send({ message: error.message })
    }
};