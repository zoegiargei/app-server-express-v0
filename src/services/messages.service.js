import MessageDbDAO from "../DAO/DAOs/Messages.DAO.db.js";

class MessageServices{
    async addMessage(newMess){
        return await MessageDbDAO.creaeteElement(newMess)
    }

    async getMessages(){
        return await MessageDbDAO.findElements()
    }
};

const messageServices = new MessageServices();

export default messageServices;