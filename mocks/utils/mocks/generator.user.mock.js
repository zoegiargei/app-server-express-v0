import { faker } from '@faker-js/faker'
import UserMock from '../../models/user.mock.js'
import generatorProductsMock from './generator.products.mock.js'

class GeneratorUserMock {
    createUserMock () {
        const products = []
        for (let index = 0; index < faker.number.int({ min: 3, max: 6 }); index++) {
            const product = generatorProductsMock.createProductMock()
            products.push(product)
        }

        const newUserMock = new UserMock({
            username: faker.internet.userName(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            age: '26',
            password: 'mypassword123.',
            cart: products
        })

        return newUserMock.toDto()
    }

    createUserMockWithEmptyCart () {
        const newUserMock = new UserMock({
            username: faker.internet.userName(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: 'faker@gmail.com',
            age: '26',
            password: 'mypassword123.'
        })
        return newUserMock.toDto()
    }
}

const generatorUserMock = new GeneratorUserMock()
export default generatorUserMock
