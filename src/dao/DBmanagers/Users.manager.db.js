import ManagerDb from "./Manager.db.js";
import userModel from "../DBmodels/User.model.js";
const usersManagerDb = new ManagerDb(userModel);
export default usersManagerDb;