import ticketDbDAO from "../DAO/DB_DAOs/Tickets.DAO.db.js";
import Ticket from "../models/Ticket.js";

class TicketService{
    constructor(ticketDAO){
        this.ticketDAO = ticketDAO
    }

    async generateTicket(data){
        
        data = {...data, purcharser: 'user@email.com'}
        const ticket = new Ticket(data)
        await this.ticketDAO.creaeteElement(ticket)
        return ticket
    }

    async cancelTicket(id){
        return await this.ticketDAO.deleteElement(id)
    }
};

export const ticketSerice = new TicketService(ticketDbDAO);
//export default TicketService;