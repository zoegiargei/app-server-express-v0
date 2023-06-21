import { faker } from '@faker-js/faker'
import ProductMock from '../../models/product.mock.js'

class GeneratorProductsMock {
    createProductMock () {
        const newProductMock = new ProductMock({
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: Number(faker.finance.accountNumber()),
            price: faker.commerce.price({ min: 1000, max: 3000 }),
            status: faker.datatype.boolean(),
            stock: faker.number.int({ max: 100 }),
            category: faker.vehicle.type(),
            owner: 'Admin'
        })

        return newProductMock.toDtoProduct()
    }

    createProductMockWithPhoto () {
        const newProductMock = new ProductMock({
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: Number(faker.finance.accountNumber()),
            price: faker.commerce.price({ min: 1000, max: 3000 }),
            status: faker.datatype.boolean(),
            stock: faker.number.int({ max: 100 }),
            category: faker.vehicle.type(),
            thumbnail: faker.image.url(),
            owner: 'Admin'
        })

        return newProductMock.toDtoProduct()
    }

    fakeImage () {
        const fakeImage = faker.image.url()
        return fakeImage
    }
}

const generatorProductsMock = new GeneratorProductsMock()
export default generatorProductsMock
