import mongoose, { Schema } from "mongoose";

const ghUserCollection = 'githubUsers';

const ghUserSchema = new mongoose.Schema({

    full_name : { type:String, required:true },
    user_id: { type:String, required:true },
    username: { type:String, required:true },
    cart: { 
        type: [
        {
            cart: {
                type: Schema.Types.ObjectId,
                ref: 'carts'
            }
        }
        ], default: {}
    },
    role: { type:String, required:true }
    
}, { versionKey: false } );

ghUserSchema.pre(/^find/, function(next) {
    this.populate('cart.cart')
    next()
});

const ghUserModel = mongoose.model(ghUserCollection, ghUserSchema);
export default ghUserModel;