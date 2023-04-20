import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({

    productsCart: {
        type: [
            {
                product: {
                    type:Schema.Types.ObjectId,
                    ref:'products'
                },
                quantity: { type:Number, required:true }
            }
        ],
        default: []
    }

}, { versionKey: false } );


cartSchema.pre(/^find/, function(next) {
    this.populate('productsCart.product')
    next()
});

const cartModel = mongoose.model(cartCollection, cartSchema);
export default cartModel;