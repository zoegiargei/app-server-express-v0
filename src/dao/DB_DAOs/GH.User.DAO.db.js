import ghUserModel from '../DBmodels/GB.User.model.js'
import DAODb from './DAO.db.js'
const GhUsersDbDAO = new DAODb(ghUserModel)
export default GhUsersDbDAO
