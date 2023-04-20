import ManagerDb from "./Manager.db.js";
import messageModel from "../DBmodels/Messages.model.js";
const messageDbManager = new ManagerDb(messageModel);
export default messageDbManager;