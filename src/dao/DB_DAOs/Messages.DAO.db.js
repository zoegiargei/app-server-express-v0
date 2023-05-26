import DAODb from './DAO.db.js'
import messageModel from '../DBmodels/Messages.model.js'
const MessageDbDAO = new DAODb(messageModel)
export default MessageDbDAO