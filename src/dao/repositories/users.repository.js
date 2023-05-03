import UsersDAODb from "../DAOs/Users.DAO.db.js";
import User from "../entities/User.entity.js";

class UserRepository{
    constructor(usersDAO){
        this.usersDAO = usersDAO
    }

    async saveOne(user){

        const newUser = new User(user)
        const dtoUser = newUser.toDto()
        await this.usersDAO.createElement(dtoUser)
        return newUser
    }

    async getAllUsers(){
        return await this.usersDAO.findElements()
    }

    async getOneById(id){
        const user = await this.usersDAO.findElementById(id)
        return new User(user)
    }

    async getUserByQuery(query){
        return await this.usersDAO.findElementsByQuery(query)
    }

    async getUsers(){
        return await this.usersDAO.findElements()
    }

    async getAField(param1, param2){
        return await this.usersDAO.findElementByProjection(param1, param2)
    }
};

const userRepository = new UserRepository(UsersDAODb);
export default userRepository;