import GhUsersDbDAO from '../DAO/DB_DAOs/GH.User.DAO.db.js'
import GithubUser from '../entities/Github.User.entity.js'
import cartsService from './carts.service.js'

class GhUserService{
    constructor(ghUserDbDAO){
        this.ghUserDbDAO = ghUserDbDAO
    }

    async saveUser(data){

        await cartsService.createCart()
        const cid = await cartsService.getLastOne()
        data = {...data, cart: cid}
        const ghUser = new GithubUser(data)
        await this.ghUserDbDAO.creaeteElement(ghUser)
        return ghUser
    }

    async getUserByQuery(query){
        return await this.ghUserDbDAO.findElementsByQuery(query)
    }

    async getAField(param1, param2){
        return await this.ghUserDbDAO.findElementByProjection(param1, param2)
    }

    async deleteGhUser(id){
        const user = this.ghUserDbDAO.findElementById(id)
        const cid = user.cart._id
        
        console.log('>>>>> ID de cart a eliminar')
        console.log(cid)

        await cartsService.deleteCart(cid)
        return await this.ghUserDbDAO.deleteUser(id)
    }
}

const ghUserService = new GhUserService(GhUsersDbDAO)
export default ghUserService