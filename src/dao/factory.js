import config from '../../config.js'
import UserRepository from './repositories/users.repository.js'
import UsersDAODb from './DB_DAOs/Users.DAO.db.js'
import ProductsService from '../services/products.service.js'
import ProductsDbDAO from './DB_DAOs/Products.DAO.db.js'
//import { MessageServices } from '../services/messages.service.js'
//import MessageDbDAO from './DB_DAOs/Messages.DAO.db.js'
//import { GhUserService } from '../services/gh.users.service.js'
//import GhUsersDbDAO from './DB_DAOs/GH.User.DAO.db.js'
//import { CartsService } from '../services/carts.service.js'
//import CartDbDAO from './DB_DAOs/Carts.DAO.db.js'

let userRepository
//let ghUserService
//let authenticationService
let productsService
//let cartsService
//let messageServices

switch (config.PERSISTENCE) {
    case 'MONGO':
        userRepository = new UserRepository(UsersDAODb)
        //ghUserService = new GhUserService(GhUsersDbDAO)
        productsService = new ProductsService(ProductsDbDAO)
        //cartsService = new CartsService(CartsDAODb)
        //messageServices = new messageServices(MessageDbDAO)
    break
        
    case 'MEMORY':
        //userRepository = new UserRepository(User_MEMORY_DAO)
        //ghUserService = new GhUserService(GHUser_MEMORY_DAO)
        //productsService = new ProductsService(PROD_MEMORY_DAO)
        //cartsService = new CartsService(CART_MEMORY_DAO)
        //messageServices = new messageServices(MESS_MEMORY_DAO)
    break
            
    default: //case: 'FS'
        //userRepository = new UserRepository(User_FS_DAO)
        //ghUserService = new GhUserService(GHUser_FS_DAO)
        //productsService = new ProductsService(PROD_FS_DAO)
        //cartsService = new CartsService(CART_FS_DAO)
        //messageServices = new messageServices(MESS_FS_DAO)
    break
}

export default {
    userRepository,
    //ghUserService,
    productsService,
    //cartsService,
    //messageServices
}