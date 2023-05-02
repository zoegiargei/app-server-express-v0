import usersManagerDb from "../DBmanagers/Users.manager.db.js";
import User from "../entities/User.entity.js";

class UserRepository{
    constructor(usersManager){
        this.usersManager = usersManager
    }

    async saveOne(user){

        const newUser = new User(user)
        const dtoUser = newUser.toDto()
        await this.usersManager.createElement(dtoUser)
        return newUser
    }

    async getAllUsers(){
        return await this.usersManager.findElements()
    }

    async getOneById(id){
        const user = await this.usersManager.findElementById(id)
        return new User(user)
    }

    async getUserByQuery(query){
        return await this.usersManager.findElementsByQuery(query)
    }

    async getUsers(){
        return await this.usersManager.findElements()
    }

    async getAField(param1, param2){
        return await this.usersManager.findElementByProjection(param1, param2)
    }
};

const userRepository = new UserRepository(usersManagerDb);
export default userRepository;