import githubUserDbManager from "../dao/DBmanagers/GH.User.mananger.db.js";
import GithubUser from "../dao/entities/Github.User.entity.js";

class GhUserService{

    async saveUser(data){

        const ghUser = new GithubUser(data)
        await githubUserDbManager.saveElement(ghUser)
        return ghUser
    }

    async getUserByQuery(query){
        return await githubUserDbManager.findElementsByQuery(query)
    }

    async getAField(param1, param2){
        return await githubUserDbManager.findElementByProjection(param1, param2)
    }
};

const ghUserService = new GhUserService();
export default ghUserService;