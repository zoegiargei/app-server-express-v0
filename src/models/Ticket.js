import { v4 as uuidv4 } from 'uuid';

class Ticket{
    constructor(amount, purchaser){
        
        this.code = this.generateCode(),
        this.purchase_datetime = this.generateDatetime()
        this.amount = amount,
        this.purchaser = purchaser
    }

    generateCode(){
        return String(uuidv4())
    }

    generateDatetime(){
        const today = new Date()
        return String((today + '' +today.toLocaleDateString(), today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()))
    }
};

export default Ticket;