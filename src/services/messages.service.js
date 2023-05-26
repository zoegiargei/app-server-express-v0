import MessageDbDAO from '../DAO/DB_DAOs/Messages.DAO.db.js'

class MessageServices{
    constructor(messageDbDAO){
        this.messageDbDAO = messageDbDAO
    }

    async addMessage(newMess){
        return await this.messageDbDAO.creaeteElement(newMess)
    }

    async getMessages(){
        return await this.messageDbDAO.findElements()
    }
}

const messageServices = new MessageServices(MessageDbDAO)

export default messageServices