import mongoose from "mongoose";

const ticketCollection = 'Tickets';

const ticketSchema = new mongoose.Schema({
    
    code: { typeof: String, required: true },
    purchase_datetime: { typeof: String, required: true },
    amount: { typeof: Number, required:true },
    purchaser: { typeof: String, required: true }
}, { versionKey: false });

const ticketModel = mongoose.model(ticketCollection, ticketSchema);
export default ticketModel;
