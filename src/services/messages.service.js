import messageDbManager from "../dao/DBmanagers/Messages.manager.db.js";

class MessageServices{
    async addMessage(newMess){
        return await messageDbManager.creaeteElement(newMess)
    }

    async getMessages(){
        return await messageDbManager.findElements()
    }
};

const messageServices = new MessageServices();

export default messageServices;