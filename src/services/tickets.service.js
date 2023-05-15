import ticketDbDAO from "../DAO/DB_DAOs/Tickets.DAO.db.js";
import Ticket from "../models/Ticket.js";

class TicketService{
    constructor(ticketDAO){
        this.ticketDAO = ticketDAO
    }

    async generateTicket(amount, purchaser){

        const ticket = new Ticket(amount, purchaser)
        await this.ticketDAO.creaeteElement(ticket)
        return ticket
    }

    async cancelTicket(id){
        return await this.ticketDAO.deleteElement(id)
    }
};

const ticketsService = new TicketService(ticketDbDAO);
export default ticketsService;