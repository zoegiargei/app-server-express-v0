import ghUserModel from "../DBmodels/GB.User.model.js";
import ManagerDb from "./Manager.db.js";
const ghUsersDbManager = new ManagerDb(ghUserModel);
export default ghUsersDbManager;
