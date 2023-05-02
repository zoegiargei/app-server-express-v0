import mongoose, { Schema } from "mongoose";

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({

    username: { type:String, required:true },
    first_name: { type:String, required:true },
    last_name: { type:String, required:true },
    email: { type:String, required:true, index:true },
    age: { type:String, required:true },
    password: { type:String, required:true },
    cart:{ typeof: Object },

    /*     cart: { 
        type: [
        {
            cart: {
                type: Schema.Types.ObjectId,
                ref: 'carts'
            }
        }
        ], default: {}
    }, */

    role: { type:String, required:true }
    
}, { versionKey: false });

/* usersSchema.pre(/^find/, function(next) {
    this.populate('cart.cart')
    next()
}); */

const userModel = mongoose.model(usersCollection, usersSchema);
export default userModel;

