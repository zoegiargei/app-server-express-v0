import User from "../dao/entities/User.entity.js";
import UsersDAODb from "../DAO/DAOs/Users.DAO.db.js";

class UsersService{

    async saveUser(dataUser){
        const user = new User(dataUser)
        await UsersDAODb.creaeteElement(user)
        return user
    }

    async getUserByQuery(query){
        return await UsersDAODb.findElementsByQuery(query)
    }

    async getUsers(){
        return await UsersDAODb.findElements()
    }

    async getAField(param1, param2){
        return await UsersDAODb.findElementByProjection(param1, param2)
    }
};

const usersService = new UsersService();
export default usersService;