import User from '../../entities/User.entity.js'

class UserRepository{
    constructor(usersDAO){
        this.usersDAO = usersDAO
    }

    async createUser(user){

        const newUser = new User(user)
        const dtoUser = newUser.toDto()
        const userSaved = await this.usersDAO.creaeteElement(dtoUser)
        return userSaved
    }

    async getAllUsers(){
        return await this.usersDAO.findElements()
    }

    async getOneById(id){
        const user = await this.usersDAO.findElementById(id)
        //return new User(user)
        return user
    }

    async getUserByQuery(query){
        return await this.usersDAO.findElementsByQuery(query)
    }

    async getAField(param1, param2){
        return await this.usersDAO.findElementByProjection(param1, param2)
    }

    async updateUser(id, value){
        return await this.usersDAO.updateElement(id, value)
    }

    async deleteUser(id){
        return await this.usersDAO.deleteElement(id)
    }
}

export default UserRepository