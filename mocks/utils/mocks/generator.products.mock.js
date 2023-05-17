import { faker } from '@faker-js/faker';
import ProductMock from "../../models/product.mock.js";

class GeneratorProductsMock{
    constructor(){}

    createProductMock(){

        const newProductMock = new ProductMock({
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({ min: 1000, max: 3000 }),
            stock: faker.number.int({ max: 100 }) 
        })

        return newProductMock.toDtoProduct()
    }
};

const generatorProductsMock = new GeneratorProductsMock();
export default generatorProductsMock;