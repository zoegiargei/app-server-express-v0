import cartsService from "./carts.service.js";
import factory from "../DAO/factory.js";


class UsersService{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async saveUser(dataUser){

        await cartsService.createCart(dataUser.email)
        const cid = await cartsService.getLastOne()

        dataUser = {...dataUser, cart: cid}
        const user = this.userRepository.createUser(dataUser)
        return user
    }

    async getUserById(){
        return await this.userRepository.getOneById(id)
    }

    async getUserByQuery(query){
        return await this.userRepository.getUserByQuery(query)
    }

    async getUsers(){
        return await this.userRepository.getAllUsers()
    }

    async getAField(param1, param2){
        return await this.userRepository.findElementByProjection(param1, param2)
    }

    async updateUser(id, newUser){
        return await this.userRepository.updateUser(id, newUser)
    }

    async deleteUser(id){
        const user = this.userRepository.getOneById(id)
        const cid = user.cart._id
        
        console.log(">>>>> ID de cart a eliminar. A modo de prueba: ")
        console.log(cid)

        await cartsService.deleteCart(cid)
        return await this.userRepository.deleteUser(id)
    }
};

const usersService = new UsersService(factory.userRepository);
export default usersService;