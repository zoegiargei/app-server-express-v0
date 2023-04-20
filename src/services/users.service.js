import User from "../dao/entities/User.entity.js";
import usersManagerDb from "../dao/DBmanagers/Users.manager.db.js";

class UsersService{

    async saveUser(dataUser){
        const user = new User(dataUser)
        await usersManagerDb.creaeteElement(user)
        return user
    }

    async getUserByQuery(query){
        return await usersManagerDb.findElementsByQuery(query)
    }

    async getUsers(){
        return await usersManagerDb.findElements()
    }

    async getAField(param1, param2){
        return await usersManagerDb.findElementByProjection(param1, param2)
    }
};

const usersService = new UsersService();
export default usersService;