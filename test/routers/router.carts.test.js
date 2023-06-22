import assert from 'assert'
import supertest from 'supertest'
import mongoose from 'mongoose'
import { after, before, describe, it } from 'mocha'
import generatorUserMock from '../../mocks/utils/mocks/generator.user.mock.js'
import usersService from '../../src/services/users.service.js'
// import generatorProductsMock from '../../mocks/utils/mocks/generator.products.mock.js'
// import ProductsDbDAO from '../../src/DAO/DB_DAOs/Products.DAO.db.js'

const PORT = 8080
const serverBaseUrl = `http://localhost:${PORT}`
const httpClient = supertest.agent(serverBaseUrl)
const MONGO_CNX_STR_TEST = 'mongodb+srv://zoegiargei00:215133@clusterecommercetest.lkx83vy.mongodb.net/test?retryWrites=true&w=majority'

let user
describe.only('Testing router carts', () => {
    before(async () => {
        await mongoose.connect(MONGO_CNX_STR_TEST)
    })
    after(async () => {
        await mongoose.connection.collection('users').deleteMany({})
        await mongoose.connection.collection('carts').deleteMany({})
        if (mongoose.connection.collection('products')) await mongoose.connection.collection('products').deleteMany({})
        await mongoose.disconnect()
    })

    it('Login', async () => {
        const newUser = generatorUserMock.createUserMockWithEmptyCart()
        const dbUser = await usersService.saveUser({ ...newUser, password: 'mypassword123.' })
        const userCredentials = { email: newUser.email, password: 'mypassword123.' }
        await httpClient
        .post('/api/session/login')
        .send(userCredentials)
        user = dbUser
    })

    describe('Endpoints', async () => {
        describe('GET to Endpoint: /api/carts/:cid', () => {
            it('Should get the cart of the user logged in if the correct cart id is provided', async () => {
                console.log(user)
                const cid = String(user.cart[0]._id)
                console.log(cid)
                const { statusCode, ok, body } = await httpClient
                .get(`/api/carts/${cid}`)
                assert.ok(ok, 'The request was not successfully')
                console.log(body)
                assert.deepStrictEqual(body.object._id, cid)
                assert.deepStrictEqual(body.object.userEmail, user.email)
                assert.deepStrictEqual(statusCode, 200, 'The status code is wrong')
            })
        })

        /*         describe('POST to Endpoint: api/carts/:cid/products/:pid', () => {
            it('Should add an existing product to the user cart, providing the product id and cart id', async () => {
                const product = await ProductsDbDAO.creaeteElement(generatorProductsMock.createProductMock())
                console.log(product)
                const pid = String(product._id)
                const cid = String(user.cart[0]._id)

                const { statusCode, ok, body } = await httpClient
                .post(`api/carts/${cid}/products/${pid}`)
                assert.ok(ok, 'The request was not successfully')
                console.log(body)
                assert.deepStrictEqual(statusCode, 200)
            })
        }) */
    })
})
