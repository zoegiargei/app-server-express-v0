import tokenModel from '../DBmodels/Token.model.js'
import DAODb from './DAO.db.js'
const tokenDbDAO = new DAODb(tokenModel)
export default tokenDbDAO
