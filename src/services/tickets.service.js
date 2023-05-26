import ticketDbDAO from '../DAO/DB_DAOs/Tickets.DAO.db.js'
import Ticket from '../models/Ticket.js'

class TicketService{
    constructor(ticketDAO){
        this.ticketDAO = ticketDAO
    }

    async generateTicket(total, email){
        const ticket = new Ticket(total, email)
        return ticket
    }

    async saveTicket(ticket){
        return await this.ticketDAO.createElement(ticket)
    }

    async cancelTicket(id){
        return await this.ticketDAO.deleteElement(id)
    }
}

const ticketsService = new TicketService(ticketDbDAO)
export default ticketsService