import DAODb from './DAO.db.js'
import ticketModel from '../DBmodels/Ticket.model.js'
const ticketDbDAO = new DAODb(ticketModel)
export default ticketDbDAO
