import mongoose from 'mongoose'

const ticketCollection = 'Tickets'

const ticketSchema = new mongoose.Schema({
    
    code: { typeof: String },
    purchase_datetime: { typeof: String },
    amount: { typeof: Number },
    purchaser: { typeof: String }
}, { versionKey: false })


const ticketModel = mongoose.model(ticketCollection, ticketSchema)
export default ticketModel
