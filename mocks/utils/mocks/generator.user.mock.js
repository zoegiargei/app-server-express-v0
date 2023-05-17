import { faker } from '@faker-js/faker';
import UserMock from '../../models/user.mock.js';
import generatorProductsMock from './generator.products.mock.js';

class GeneratorUserMock{
    constructor(){}

    createUserMock(){

        const products = []
        for (let index = 0; index < faker.number.int({ min: 3, max: 6 }); index++) {
            const product = generatorProductsMock.createProductMock();
            products.push(product);
            
        }
        
        const newUserMock = new UserMock({
            id: faker.string.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            first_name: faker.internet.userName(),
            cart: products
        })

        return newUserMock.toDto()
    }
};

const generatorUserMock = new GeneratorUserMock();
export default generatorUserMock;