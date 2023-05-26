import DAODb from './DAO.db.js'
import userModel from '../DBmodels/User.model.js'
const UsersDAODb = new DAODb(userModel)
export default UsersDAODb