import mongoose from 'mongoose';

const buyNowSchema = new mongoose.Schema({
   totalPrice:[],
   quantity:[],
   product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },

  ],



}, {
    timestamps: true,
}, );

export default mongoose.model('buyNow', buyNowSchema);