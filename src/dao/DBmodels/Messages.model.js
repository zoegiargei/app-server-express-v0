import mongoose from 'mongoose'

const messCollection = 'messages'

const messSchema = new mongoose.Schema({

    name: {type:String, require:true},
    mess : {type:String, require:true}

}, { versionKey: false } )

const messageModel = mongoose.model(messCollection, messSchema)
export default messageModel