import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const prodCollection = 'products';

const prodSchema = new mongoose.Schema({

    title: { type:String, required:true },
    description: { type:String, required:true },
    code: { type:Number, required:true },
    price: { type:String, required:true }, 
    status: { type:Boolean, default:true},
    stock: { type:Number, required:true },
    category: { 
        type:String, 
        index:true, 
        required:true 
    },
    thumbnail: {
        type: [{ type:Object, required:true, cast:false }]
        /*         validate: {
            validator: v => Array.isArray(v) && v.length > 0,
            message: "Array can't be empty"
        } */    
    }
}, { versionKey: false } );

prodSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(prodCollection, prodSchema);
export default productModel;