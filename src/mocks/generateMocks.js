import { faker } from '@faker-js/faker'
import User from '../entities/User.entity.js'
import Product from '../models/Product.js'
import ProductsDbDAO from '../DAO/DB_DAOs/Products.DAO.db.js'
import UsersDAODb from '../DAO/DB_DAOs/Users.DAO.db.js'

class GeneratorMocks{
    
    async createUserMock(){

        const products = []
        for (let index = 0; index < faker.number.int({ min: 3, max: 6 }); index++) {
            const product = await this.createProductMock()
            products.push(product)
        }
    
        const newUser = new User({
            username: faker.person.fullName(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 20, max: 60 }),
            password: faker.internet.password(),
            cart: [
    
            ],
            role: 'User'
        })
    
        return newUser.toDto()
    };
    
    async createProductMock(){
    
        const newProduct = new Product({
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: faker.number.int(),
            price: faker.commerce.price({ min: 1000, max: 3000 }),
            status: faker.datatype.boolean(),
            stock: faker.number.int({ min: 10, max: 50 }),
            category: faker.commerce.productAdjective(),
            thumbnail: faker.image.url()
        })
    
        await ProductsDbDAO.creaeteElement(newProduct)
        return newProduct
    }
}

export async function generateMocks(){

    const generatorMocks = new GeneratorMocks()

    for (let index = 0; index < 20; index++) {
        const newUser = await generatorMocks.createUserMock()
        await UsersDAODb.creaeteElement(newUser)
    }
}




