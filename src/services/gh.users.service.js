import GhUsersDbDAO from "../DAO/DAOs/GH.User.DAO.db.js";
import GithubUser from "../dao/entities/Github.User.entity.js";

class GhUserService{

    async saveUser(data){

        const ghUser = new GithubUser(data)
        await GhUsersDbDAO.creaeteElement(ghUser)
        return ghUser
    }

    async getUserByQuery(query){
        return await GhUsersDbDAO.findElementsByQuery(query)
    }

    async getAField(param1, param2){
        return await GhUsersDbDAO.findElementByProjection(param1, param2)
    }
};

const ghUserService = new GhUserService();
export default ghUserService;