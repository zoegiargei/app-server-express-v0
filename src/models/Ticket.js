import { v4 as uuidv4 } from 'uuid';

class Ticket{
    constructor({_id=null, amount, purchaser}){
        this._id = _id,
        this.code = (uuidv4()).toString,
        this.purchase_datetime = () => {
            const today = new Date()
            return (`${today.toLocaleDateString()}${today.getHours()} : ${today.getMinutes()} : ${today.getSeconds()}`).toString
        }
        this.amount = amount,
        this.purchaser = purchaser
    }
};

export default Ticket;